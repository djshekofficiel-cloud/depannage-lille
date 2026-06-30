'use client';

import { HeroGeometric } from "@/components/HeroGeometric";
import InterventionGallery from "@/components/InterventionGallery";
import VehiculesSection from "@/components/VehiculesSection";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { villes } from "@/lib/villes";

const PHONE = '07 67 87 80 34';

// Villes affichées sur la home — issues directement de lib/villes.ts (zéro lien mort).
const ZONES = villes.slice(0, 12);

const SERVICES = [
  { icon: '🔧', title: 'Dépannage', desc: 'Réparation sur place pour les petites pannes mécaniques' },
  { icon: '🚗', title: 'Remorquage', desc: 'Transport sécurisé de votre véhicule partout dans le Nord' },
  { icon: '🔋', title: 'Batterie', desc: 'Changement et recharge batterie disponible 24h/24' },
  { icon: '⚙️', title: 'Crevaison', desc: 'Réparation rapide de pneu sur place ou en atelier' },
  { icon: '📍', title: 'Rapatriement', desc: 'Assistance routière complète vers votre domicile' },
  { icon: '🚨', title: 'Urgence', desc: 'Intervention immédiate garantie 20–30 min max' },
  { icon: '🏍️', title: 'Moto & scooter', desc: 'Remorquage 2 roues sécurisé, arrimage professionnel' },
];

const AVANTAGES = [
  { num: '01', title: 'Rapidité', detail: '20–30 min d\'intervention sur Lille et la MEL' },
  { num: '02', title: 'Fiabilité', detail: 'Techniciens qualifiés et équipement professionnel' },
  { num: '03', title: 'Disponibilité', detail: 'Service 24h/24, 7j/7, même jours fériés' },
  { num: '04', title: 'Transparence', detail: 'Prix annoncés avant intervention, sans surprise' },
];

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <HeroGeometric />

      {/* ── SECTION SERVICES ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-black via-slate-950 to-black border-t border-red-500/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-red-300 border border-red-500/40 bg-red-950/20 mb-4">
              Nos prestations
            </span>
            <h2 className="font-black text-white mb-4 leading-none"
              style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>
              Nos&nbsp;
              <span style={{
                background: 'linear-gradient(90deg,#ef4444,#dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(220,38,38,0.6))',
              }}>services</span>
            </h2>
            <p className="text-slate-300 mx-auto" style={{ fontSize: 'clamp(0.95rem,2.5vw,1.15rem)', maxWidth: 560 }}>
              Dépannage complet et rapide pour tous vos besoins automobiles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="card-glow-orange group relative p-6 sm:p-8 cursor-default"
                style={{ animation: `slide-up 0.5s ease-out ${i * 0.08}s both` }}
              >
                <div className="card-glow-top" aria-hidden />
                <div className="absolute top-0 left-0 w-24 h-24 rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle,rgba(249,115,22,0.22) 0%,transparent 70%)' }} />

                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 select-none">{s.icon}</div>
                  <h3
                    className="font-bold mb-2 sm:mb-3 leading-tight text-white"
                    style={{
                      fontSize: 'clamp(1.1rem,3vw,1.4rem)',
                      textShadow: '0 0 14px rgba(249,115,22,0.65), 0 0 30px rgba(255,160,50,0.28)',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed" style={{ fontSize: 'clamp(0.85rem,2vw,0.95rem)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION AVANTAGES ── */}
      <section className="py-16 sm:py-24 bg-black border-t border-blue-500/15">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-blue-300 border border-blue-500/40 bg-blue-950/20 mb-4">
              Nos atouts
            </span>
            <h2 className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>
              Pourquoi nous&nbsp;
              <span style={{
                background: 'linear-gradient(90deg,#3b82f6,#2563eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.6))',
              }}>choisir</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {AVANTAGES.map((item, i) => (
              <div
                key={i}
                className="card-glow-orange flex gap-4 sm:gap-6 items-start p-5 sm:p-7 group"
              >
                <div className="card-glow-top" aria-hidden />
                <div
                  className="relative z-10 font-black leading-none flex-shrink-0 transition-all duration-300 group-hover:opacity-60"
                  style={{
                    fontSize: 'clamp(2.5rem,8vw,4rem)',
                    color: '#f97316',
                    opacity: 0.28,
                    textShadow: '0 0 20px rgba(249,115,22,0.75)',
                  }}
                >
                  {item.num}
                </div>
                <div className="relative z-10 pt-1">
                  <h3
                    className="font-bold text-white mb-1.5"
                    style={{
                      fontSize: 'clamp(1.1rem,3vw,1.4rem)',
                      textShadow: '0 0 16px rgba(249,115,22,0.55), 0 0 32px rgba(255,160,50,0.25)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed" style={{ fontSize: 'clamp(0.88rem,2vw,1rem)' }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InterventionGallery />

      <VehiculesSection />

      {/* ── SECTION ZONES ── */}
      <section className="py-16 sm:py-20 border-t border-white/5 bg-gradient-to-b from-slate-950 to-black">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-red-300 border border-red-500/40 bg-red-950/20 mb-4">
              Zones desservies
            </span>
            <h2 className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>
              Nous intervenons&nbsp;
              <span style={{
                background: 'linear-gradient(90deg,#ef4444,#dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(220,38,38,0.6))',
              }}>partout</span>
            </h2>
            <p className="text-slate-400 mt-3" style={{ fontSize: 'clamp(0.9rem,2.2vw,1rem)' }}>
              Nord (59) · Pas-de-Calais (62) · toute la MEL
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {ZONES.map((ville) => (
              <a key={ville.slug}
                href={`/zones-intervention/${ville.slug}`}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300"
                style={{
                  border: '1px solid rgba(239,68,68,0.35)',
                  background: 'rgba(220,38,38,0.06)',
                  color: 'rgba(255,255,255,0.75)',
                  textShadow: '0 0 8px rgba(239,68,68,0)',
                  transition: 'all .25s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(239,68,68,0.75)';
                  el.style.background = 'rgba(220,38,38,0.15)';
                  el.style.color = '#fff';
                  el.style.textShadow = '0 0 10px rgba(239,68,68,0.7)';
                  el.style.boxShadow = '0 0 18px rgba(239,68,68,0.25)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(239,68,68,0.35)';
                  el.style.background = 'rgba(220,38,38,0.06)';
                  el.style.color = 'rgba(255,255,255,0.75)';
                  el.style.textShadow = 'none';
                  el.style.boxShadow = 'none';
                }}
              >
                {ville.nom}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (SEO : FAQPage) ── */}
      <Faq />

      {/* ── FORMULAIRE CONTACT ── */}
      <section className="py-16 sm:py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-blue-300 border border-blue-500/40 bg-blue-950/20 mb-4">
              Demande planifiée
            </span>
            <h2 className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>
              Planifier une&nbsp;
              <span style={{
                background: 'linear-gradient(90deg,#3b82f6,#2563eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.6))',
              }}>intervention</span>
            </h2>
            <p className="text-slate-300 mt-3 mx-auto" style={{ fontSize: 'clamp(0.9rem,2.2vw,1rem)', maxWidth: 560 }}>
              Pour une demande <strong className="text-blue-300">non urgente</strong> : par exemple faire remorquer un véhicule à une <strong className="text-white">date et une heure précises</strong>. Nous vous répondons sous 2 heures.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold"
              style={{ border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(220,38,38,0.08)', color: '#fca5a5' }}>
              ⚠️ Urgence ou panne en cours ? Appelez le&nbsp;
              <a href={`tel:${PHONE}`} className="text-red-300 underline font-bold whitespace-nowrap">{PHONE}</a>
            </p>
          </div>

          <div className="card-glow-orange p-6 sm:p-8">
            <div className="card-glow-top" aria-hidden />
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
          <p className="text-center text-slate-500 text-xs sm:text-sm mt-6">
            Ou appelez directement : <strong className="text-red-400">{PHONE}</strong>
          </p>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-black via-red-950/8 to-black">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="font-black text-white mb-4 leading-none"
            style={{ fontSize: 'clamp(2rem,7vw,4.5rem)' }}>
            Vous avez besoin d&apos;aide&nbsp;?
          </h2>
          <p className="text-slate-300 mb-8 sm:mb-12 mx-auto"
            style={{ fontSize: 'clamp(1rem,2.8vw,1.25rem)', maxWidth: 480 }}>
            Appelez-nous maintenant — nos techniciens arrivent en <strong className="text-red-400">20–30 min</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${PHONE}`}
              className="group relative flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-bold text-white overflow-hidden"
              style={{
                fontSize: 'clamp(1rem,3vw,1.2rem)',
                background: 'linear-gradient(135deg,#dc2626,#b91c1c)',
                boxShadow: '0 0 32px rgba(220,38,38,0.5),0 4px 24px rgba(0,0,0,0.5)',
                border: '1px solid rgba(239,68,68,0.5)',
                transition: 'transform .2s,box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 0 48px rgba(220,38,38,0.65),0 8px 32px rgba(0,0,0,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 0 32px rgba(220,38,38,0.5),0 4px 24px rgba(0,0,0,0.5)'; }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Appeler maintenant — {PHONE}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
            <a href="/contact"
              className="flex items-center justify-center px-8 py-5 rounded-xl font-bold text-white transition-all duration-300"
              style={{
                fontSize: 'clamp(1rem,3vw,1.2rem)',
                border: '1px solid rgba(148,163,184,0.3)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(148,163,184,0.3)'; }}
            >
              Demander une intervention
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
