'use client';

import { useEffect, useState } from 'react';

const PHONE = '07 67 87 80 34';

export function HeroNeon() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black flex flex-col items-center justify-center"
      style={{ minHeight: '100svh' }}>

      {/* ── FOND ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0000] via-black to-[#00000a]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(220,38,38,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.6) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ── HALOS ── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 'min(700px,90vw)', height: 'min(700px,90vw)', background: 'radial-gradient(circle,rgba(220,38,38,0.30) 0%,transparent 70%)', animation: 'halo-pulse 4s ease-in-out infinite', filter: 'blur(8px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 'min(500px,70vw)', height: 'min(500px,70vw)', background: 'radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)', animation: 'halo-pulse 6s ease-in-out infinite 1.5s', filter: 'blur(8px)' }} />
        </div>
      )}

      {/* ── CONTENU ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center gap-8 sm:gap-10">

        {/* Badge disponibilité */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/50 bg-red-950/30 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" style={{ animation: 'ping 1.5s infinite' }} />
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-red-300 uppercase whitespace-nowrap">
            Disponible 24h/24 · 7j/7
          </span>
        </div>

        {/* ── LOGO GRAND FORMAT ── */}
        <div className="relative flex items-center justify-center w-full"
          style={{ maxWidth: 'min(480px, 85vw)' }}>

          {/* Halos derrière logo */}
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(220,38,38,0.50) 0%,rgba(220,38,38,0.10) 50%,transparent 75%)', animation: 'halo-pulse 3s ease-in-out infinite', filter: 'blur(24px)' }} />
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle at 60% 40%,rgba(59,130,246,0.25) 0%,transparent 60%)', animation: 'halo-pulse 4s ease-in-out infinite 1s', filter: 'blur(28px)' }} />

          {/* Anneau néon tournant */}
          {mounted && (
            <>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
                style={{ animation: 'spin-slow 12s linear infinite' }}>
                <defs>
                  <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#ef4444" stopOpacity="0.05" />
                    <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="47" fill="none" stroke="url(#rg1)" strokeWidth="1.4" />
              </svg>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
                style={{ animation: 'spin-reverse 18s linear infinite' }}>
                <defs>
                  <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.02" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="44" fill="none" stroke="url(#rg2)" strokeWidth="0.8" strokeDasharray="28 12" />
              </svg>
            </>
          )}

          {/* Image logo */}
          <img
            src="/logo-sm-depannage-opt.png"
            alt="SM Dépannage — Dépannage automobile rapide et fiable 24h/24"
            className="relative z-10 w-full h-auto object-contain select-none"
            style={{
              filter: mounted
                ? 'drop-shadow(0 0 28px rgba(220,38,38,0.85)) drop-shadow(0 0 70px rgba(220,38,38,0.40)) drop-shadow(0 0 3px rgba(255,255,255,0.5))'
                : 'none',
              animation: 'logo-entrance 1.1s cubic-bezier(0.34,1.56,0.64,1) forwards, logo-float 6s ease-in-out 1.1s infinite',
              opacity: 0,
            }}
          />
        </div>

        {/* ── TITRE ── */}
        <div className="text-center space-y-3 px-2">
          <h1 className="font-black text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(1.9rem,6vw,5rem)' }}>
            Dépannage automobile
            <br />
            <span style={{
              background: 'linear-gradient(90deg,#ef4444,#dc2626,#ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: mounted ? 'drop-shadow(0 0 16px rgba(220,38,38,0.6))' : 'none',
            }}>
              rapide &amp; fiable
            </span>
          </h1>
          <p className="text-slate-300 leading-relaxed mx-auto"
            style={{ fontSize: 'clamp(0.9rem,2.5vw,1.2rem)', maxWidth: 520 }}>
            Nous arrivons en <strong className="text-red-400">20–30 min</strong> sur Lille
            et toute la région Nord–Pas-de-Calais.
          </p>
        </div>

        {/* ── BADGES ── */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/40 bg-red-950/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-red-200 whitespace-nowrap">Disponible maintenant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/40 bg-blue-950/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-blue-200 whitespace-nowrap">Techniciens qualifiés</span>
          </div>
        </div>

        {/* ── BOUTONS CTA ── */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-md">
          <a href={`tel:${PHONE}`}
            className="group relative flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-white overflow-hidden"
            style={{
              fontSize: 'clamp(0.9rem,2.5vw,1.1rem)',
              background: 'linear-gradient(135deg,#dc2626,#b91c1c)',
              boxShadow: '0 0 28px rgba(220,38,38,0.5),0 4px 20px rgba(0,0,0,0.4)',
              border: '1px solid rgba(239,68,68,0.5)',
            }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Appeler maintenant</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
          <a href="/contact"
            className="flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:bg-white/10"
            style={{
              fontSize: 'clamp(0.9rem,2.5vw,1.1rem)',
              border: '1px solid rgba(148,163,184,0.3)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
            }}>
            Demander intervention
          </a>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-xs sm:max-w-md border-t border-white/10 pt-6">
          {[
            { val: '20–30', unit: 'min', label: 'Intervention' },
            { val: '24/7', unit: '', label: 'Disponible' },
            { val: '59/62', unit: '', label: 'Couverture' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-black text-red-500 leading-none" style={{ fontSize: 'clamp(1.2rem,4vw,1.8rem)' }}>
                {s.val}<span className="text-red-400 text-sm">{s.unit}</span>
              </div>
              <div className="text-slate-400 mt-1 uppercase tracking-wider" style={{ fontSize: 'clamp(0.6rem,1.5vw,0.75rem)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes halo-pulse  { 0%,100%{opacity:.6;} 50%{opacity:1;} }
        @keyframes spin-slow   { to{transform:rotate(360deg);} }
        @keyframes spin-reverse{ to{transform:rotate(-360deg);} }
        @keyframes logo-entrance {
          from{opacity:0;transform:scale(.78) translateY(24px);}
          to  {opacity:1;transform:scale(1)   translateY(0);}
        }
        @keyframes logo-float {
          0%,100%{transform:translateY(0);}
          50%    {transform:translateY(-10px);}
        }
        @keyframes ping {
          75%,100%{transform:scale(2);opacity:0;}
        }
      `}</style>
    </section>
  );
}
