'use client';

import { useEffect, useRef, useState } from 'react';

type Role = 'user' | 'assistant';
interface Msg {
  role: Role;
  content: string;
}

const PHONE = '07 67 87 80 34';
const WAZE_LINK = 'https://www.waze.com/ul?address=105%20Rue%20Delannoy%2C%2059160%20Lille&navigate=yes';
const WHATSAPP_LINK =
  'https://wa.me/33767878034?text=' +
  encodeURIComponent('Bonjour, j\'ai besoin d\'un dépannage. Voici ma situation : ');
const WELCOME =
  'Bonjour 👋 Je suis l\'assistant SM Dépannage. Une panne, un remorquage, une urgence dans le 59 ou le 62 ? Dites-moi tout.';

// Questions rapides proposées au visiteur (cliquables).
const QUICK_REPLIES = [
  'Quels sont vos tarifs ?',
  'Quel est le délai d\'intervention ?',
  'Vous intervenez dans ma ville ?',
  'J\'ai besoin d\'un dépannage',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: WELCOME }]);
  const [questionnaireSent, setQuestionnaireSent] = useState(false);
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Détecter si le questionnaire est complet (3+ messages utilisateur)
  useEffect(() => {
    const userMessages = messages.filter((m) => m.role === 'user');
    const isComplete = userMessages.length >= 3 && !questionnaireSent;
    setIsQuestionnaireComplete(isComplete);

    // Si complet et pas encore suggéré, afficher un message
    if (isComplete && !messages.some((m) => m.content.includes('Envoyer par WhatsApp'))) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `✅ Parfait! J'ai toutes les infos.\n\n👇 Cliquez sur "Envoyer par WhatsApp" ci-dessous pour m'envoyer votre demande. Je vous répondrai directement!`,
        },
      ]);
    }
  }, [messages, questionnaireSent]);

  async function send(forced?: string) {
    const text = (forced ?? input).trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // On renvoie tout l'historique (le modèle est sans mémoire), hors message d'accueil.
        body: JSON.stringify({
          messages: history
            .filter((m, i) => !(i === 0 && m.role === 'assistant'))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        const fallback = await res.text().catch(() => '');
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: 'assistant',
            content: fallback || `Service indisponible. Appelez-nous au ${PHONE}.`,
          };
          return next;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      // Lecture du flux : effet « en train d'écrire ».
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: acc };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: 'assistant',
          content: `Connexion interrompue. Appelez-nous au ${PHONE}.`,
        };
        return next;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  // Ajoute un message de l'assistant côté client (info locale, sans appel au modèle).
  function pushAssistant(content: string) {
    setMessages((prev) => [...prev, { role: 'assistant', content }]);
  }

  // Envoie toutes les infos collectées du chat via WhatsApp CallMeBot
  async function sendChatInfoToWhatsApp() {
    if (questionnaireSent) return;

    try {
      // Construire le résumé du chat
      const chatSummary = messages
        .filter((m) => m.role === 'user')
        .map((m) => `• ${m.content}`)
        .join('\n');

      const fullMessage = `📋 *Nouvelle demande du chatbot SM Dépannage*\n\n${chatSummary}\n\n---\nDate: ${new Date().toLocaleString('fr-FR')}`;

      // Envoyer via API route serveur (sécurisé)
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: fullMessage }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setQuestionnaireSent(true);
        pushAssistant(
          `✅ Vos infos ont été envoyées par WhatsApp à ${PHONE}. Nous vous répondrons rapidement!`
        );
      } else {
        const errorMsg = data.error || 'Erreur inconnue';
        console.error('WhatsApp error:', errorMsg);
        pushAssistant(
          `⚠️ Erreur d'envoi: ${errorMsg}\n\nVeuillez appeler directement au ${PHONE}.`
        );
      }
    } catch (error) {
      console.error('WhatsApp send error:', error);
      pushAssistant(
        `Erreur de connexion. Appelez-nous directement au ${PHONE}.`
      );
    }
  }

  // Demande la position du visiteur → déduit la ville couverte la plus proche (/api/position),
  // puis injecte l'info dans la conversation pour que l'assistant confirme zone + délai.
  function demanderPosition() {
    if (loading) return;
    if (!navigator.geolocation) {
      pushAssistant(
        `Votre navigateur ne permet pas la géolocalisation. Indiquez-moi simplement votre ville, ou appelez le ${PHONE}.`,
      );
      return;
    }

    pushAssistant('📍 Je récupère votre position…');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch('/api/position', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
          });
          const data = await res.json().catch(() => null);
          if (res.ok && data?.ville) {
            send(
              `📍 Je suis géolocalisé près de ${data.ville} (${data.cp}). Pouvez-vous intervenir et sous quel délai ?`,
            );
          } else {
            pushAssistant(
              `Je n'ai pas réussi à situer votre position. Dites-moi votre ville, ou appelez le ${PHONE}.`,
            );
          }
        } catch {
          pushAssistant(`Erreur lors de la localisation. Appelez-nous au ${PHONE}.`);
        }
      },
      (err) => {
        pushAssistant(
          `Position non partagée (${err.message}). Indiquez-moi votre ville, ou appelez le ${PHONE}.`,
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <>
      {/* Bouton flottant - Design ludique et responsive */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={open}
        className="fixed z-[100] bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center justify-center rounded-full text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 md:hover:scale-105 animate-bounce"
        style={{
          width: 'clamp(56px, 12vw, 72px)',
          height: 'clamp(56px, 12vw, 72px)',
          background: 'linear-gradient(135deg, #25D366 0%, #1f9d55 100%)',
          boxShadow: '0 4px 20px rgba(37,211,102,0.5), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.3)',
          minWidth: 56,
          minHeight: 56,
        }}
        onMouseEnter={(e) => {
          if (window.innerWidth >= 768) {
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6), 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)';
        }}
      >
        {open ? (
          <svg width="clamp(24px, 5vw, 32px)" height="clamp(24px, 5vw, 32px)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="clamp(26px, 5vw, 34px)" height="clamp(26px, 5vw, 34px)" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.338c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          </svg>
        )}
      </button>

      {/* Fenêtre de chat - Responsive et ludique */}
      {open && (
        <div
          className="fixed z-[100] bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col overflow-hidden transition-all duration-300 ease-out animate-slide-up"
          style={{
            width: 'min(480px, calc(100vw - 2rem))',
            height: 'min(700px, calc(100vh - 5.5rem))',
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: 'clamp(16px, 4vw, 24px)',
            border: '1.5px solid rgba(37,211,102,0.3)',
            boxShadow: '0 8px 32px rgba(37,211,102,0.15), 0 16px 64px rgba(0,0,0,0.4)',
          }}
        >
          {/* En-tête */}
          <div
            className="flex items-center gap-2.5 px-4 py-3.5 sm:gap-3 sm:px-5 sm:py-4 backdrop-blur-sm border-b border-white/10"
            style={{ background: 'linear-gradient(90deg,rgba(239,68,68,0.08),rgba(239,68,68,0.04))' }}
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-pulse" style={{ boxShadow: '0 0 12px rgba(52,211,153,0.6)' }} />
              <span className="relative inline-flex h-full w-full rounded-full bg-emerald-300" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-sm sm:text-base leading-tight truncate">
                <span className="text-red-400">SM</span> Dépannage
              </div>
              <div className="text-xs sm:text-sm text-slate-400 truncate">En ligne · répond maintenant</div>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Continuer sur WhatsApp"
              title="Continuer sur WhatsApp"
              className="flex items-center justify-center rounded-lg text-white flex-shrink-0 transition-all duration-200 hover:scale-110"
              style={{ width: 32, height: 32, background: '#25D366', minWidth: 32 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.519 5.26l-.999 3.648 3.97-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', border: '1px solid rgba(239,68,68,0.4)' }}
            >
              Appeler
            </a>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 sm:py-5 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div
                  className="max-w-[88%] sm:max-w-[80%] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words transition-all duration-200"
                  style={
                    m.role === 'user'
                      ? {
                          background: 'linear-gradient(135deg,#ef4444,#dc2626)',
                          color: '#fff',
                          borderBottomRightRadius: 4,
                          boxShadow: '0 2px 8px rgba(239,68,68,0.3)'
                        }
                      : {
                          background: 'rgba(148,163,184,0.08)',
                          color: '#e2e8f0',
                          border: '1px solid rgba(148,163,184,0.2)',
                          borderBottomLeftRadius: 4,
                          backdropFilter: 'blur(4px)'
                        }
                  }
                >
                  {m.content || (loading && i === messages.length - 1 ? '…' : '')}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.content === '' && (
              <div className="flex justify-start animate-fade-in">
                <div
                  className="px-4 py-3 rounded-xl sm:rounded-2xl flex gap-2"
                  style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.2)', backdropFilter: 'blur(4px)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Questions rapides — tant que le visiteur n'a rien demandé */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 pt-2 animate-fade-in">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs sm:text-sm text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 hover:bg-red-500/20 hover:border-red-400/60 active:scale-95"
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saisie */}
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-white/10 backdrop-blur-sm">
            {/* Boutons d'action si questionnaire complet */}
            {messages.length > 1 && !questionnaireSent && (
              <div className="space-y-2 mb-3 animate-fade-in">
                {/* Bouton WhatsApp avec animation */}
                <button
                  onClick={sendChatInfoToWhatsApp}
                  disabled={loading}
                  className={`w-full text-sm sm:text-base px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 ${
                    isQuestionnaireComplete ? 'whatsapp-pulse' : ''
                  } hover:shadow-lg active:scale-95`}
                  style={{
                    background: 'linear-gradient(135deg,#10b981,#059669)',
                    border: '1px solid rgba(16,185,129,0.4)',
                  }}
                >
                  📲 Envoyer par WhatsApp
                </button>

                {/* Bouton Waze si complet */}
                {isQuestionnaireComplete && (
                  <a
                    href={WAZE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-sm sm:text-base px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-white text-center transition-all duration-200 hover:shadow-lg active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg,#3b82f6,#2563eb)',
                      border: '1px solid rgba(59,130,246,0.4)',
                    }}
                  >
                    🗺️ Ouvrir Waze
                  </a>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                onClick={demanderPosition}
                disabled={loading}
                aria-label="Partager ma position"
                title="Partager ma position"
                className="flex items-center justify-center rounded-lg text-slate-300 disabled:opacity-40 flex-shrink-0 transition-all duration-200 hover:bg-slate-700/40 hover:text-slate-100"
                style={{
                  width: 42,
                  height: 42,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(148,163,184,0.2)',
                  minWidth: 42,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Décrivez votre panne…"
                aria-label="Votre message"
                className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/50"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(148,163,184,0.2)' }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Envoyer"
                className="flex items-center justify-center rounded-lg text-white disabled:opacity-40 flex-shrink-0 transition-all duration-200 hover:shadow-lg active:scale-95"
                style={{
                  width: 42,
                  height: 42,
                  background: 'linear-gradient(135deg,#ef4444,#dc2626)',
                  border: '1px solid rgba(239,68,68,0.4)',
                  minWidth: 42,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.4 20.4 21 12 3.4 3.6 3 10l12 2-12 2z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-slate-500 text-center mt-2.5">
              🆘 Urgence vitale ? 112 • 24h/24
            </p>
          </div>
        </div>
      )}
    </>
  );
}
