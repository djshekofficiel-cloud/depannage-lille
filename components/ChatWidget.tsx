'use client';

import { useEffect, useRef, useState } from 'react';

type Role = 'user' | 'assistant';
interface Msg {
  role: Role;
  content: string;
}

const PHONE = '07 67 87 80 34';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

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

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={open}
        className="fixed z-[100] bottom-5 right-5 flex items-center justify-center rounded-full text-white"
        style={{
          width: 60,
          height: 60,
          background: 'linear-gradient(135deg,#dc2626,#b91c1c)',
          boxShadow: '0 0 28px rgba(220,38,38,0.55), 0 6px 20px rgba(0,0,0,0.4)',
          border: '1px solid rgba(239,68,68,0.5)',
          transition: 'transform .2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.1.9 4 2.4 5.5L3 21l4.3-1.3c1.4.5 2.9.8 4.7.8 5.5 0 10-3.8 10-8.5S17.5 3 12 3z" />
          </svg>
        )}
      </button>

      {/* Fenêtre de chat */}
      {open && (
        <div
          className="fixed z-[100] bottom-24 right-5 flex flex-col overflow-hidden rounded-2xl"
          style={{
            width: 'min(380px, calc(100vw - 2.5rem))',
            height: 'min(560px, calc(100vh - 8rem))',
            background: 'linear-gradient(180deg,#0a0a14,#05050c)',
            border: '1px solid rgba(239,68,68,0.3)',
            boxShadow: '0 0 40px rgba(220,38,38,0.25), 0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* En-tête */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: 'rgba(220,38,38,0.08)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <div className="flex-1">
              <div className="font-bold text-white text-sm leading-tight" style={{ textShadow: '0 0 12px rgba(239,68,68,0.5)' }}>
                <span className="text-red-500" style={{ textShadow: '0 0 14px rgba(239,68,68,0.9), 0 0 28px rgba(239,68,68,0.5)' }}>SM</span> Dépannage
              </div>
              <div className="text-[11px] text-slate-300">En ligne · répond en quelques secondes</div>
            </div>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', border: '1px solid rgba(239,68,68,0.4)' }}
            >
              Appeler
            </a>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words"
                  style={
                    m.role === 'user'
                      ? { background: 'linear-gradient(135deg,#dc2626,#b91c1c)', color: '#fff', borderBottomRightRadius: 4 }
                      : { background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)', borderBottomLeftRadius: 4 }
                  }
                >
                  {m.content || (loading && i === messages.length - 1 ? '…' : '')}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.content === '' && (
              <div className="flex justify-start">
                <div
                  className="px-3.5 py-3 rounded-2xl flex gap-1"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Questions rapides — tant que le visiteur n'a rien demandé */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs text-left px-3 py-2 rounded-xl transition-colors"
                    style={{
                      background: 'rgba(220,38,38,0.08)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(220,38,38,0.18)';
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(220,38,38,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saisie */}
          <div className="px-3 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Décrivez votre panne…"
                aria-label="Votre message"
                className="flex-1 px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Envoyer"
                className="flex items-center justify-center rounded-xl text-white disabled:opacity-40"
                style={{
                  width: 42,
                  height: 42,
                  background: 'linear-gradient(135deg,#dc2626,#b91c1c)',
                  border: '1px solid rgba(239,68,68,0.4)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.4 20.4 21 12 3.4 3.6 3 10l12 2-12 2z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              Urgence vitale ? Appelez le 112. Sinon, on intervient 24h/24.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
