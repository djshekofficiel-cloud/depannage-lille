'use client';

import { useEffect, useState } from 'react';

const PHONE = '07 67 87 80 34';

export function HeroNeon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">

      {/* ── FOND ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0000] via-black to-[#00000a]" />

      {/* Grille subtile */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(220,38,38,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.6) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ── HALOS ARRIÈRE ───────────────────────────── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Rouge large */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.30) 0%, transparent 70%)', animation: 'halo-pulse 4s ease-in-out infinite' }} />
          {/* Bleu secondaire */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', animation: 'halo-pulse 6s ease-in-out infinite 1.5s' }} />
          {/* Éclat blanc central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />
        </div>
      )}

      {/* ── CONTENU ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-4 py-16 w-full max-w-5xl mx-auto">

        {/* ── BADGE URGENCE ── */}
        <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/50 bg-red-950/30 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500" style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
          <span className="text-xs font-bold tracking-widest text-red-300 uppercase">Disponible 24h/24 · 7j/7</span>
        </div>

        {/* ── LOGO GRAND FORMAT AVEC NÉON ── */}
        <div className="relative flex items-center justify-center" style={{ width: '100%', maxWidth: 560 }}>

          {/* Halo rouge derrière le logo */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(220,38,38,0.45) 0%, rgba(220,38,38,0.10) 50%, transparent 75%)',
              animation: 'halo-pulse 3s ease-in-out infinite',
              filter: 'blur(20px)',
            }} />

          {/* Halo bleu décalé */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 60% 40%, rgba(59,130,246,0.25) 0%, transparent 60%)',
              animation: 'halo-pulse 4s ease-in-out infinite 1s',
              filter: 'blur(24px)',
            }} />

          {/* Anneau néon rouge tournant */}
          {mounted && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin-slow 12s linear infinite' }}>
              <defs>
                <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.9" />
                  <stop offset="40%"  stopColor="#ef4444" stopOpacity="0.1" />
                  <stop offset="60%"  stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                </linearGradient>
                <filter id="blur-ring">
                  <feGaussianBlur stdDeviation="0.6" />
                </filter>
              </defs>
              <circle cx="50" cy="50" r="47" fill="none" stroke="url(#ring-grad)" strokeWidth="1.2" filter="url(#blur-ring)" />
            </svg>
          )}

          {/* Anneau bleu contre-tournant */}
          {mounted && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin-reverse 18s linear infinite' }}>
              <defs>
                <linearGradient id="ring-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.7" />
                  <stop offset="50%"  stopColor="#3b82f6" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="44" fill="none" stroke="url(#ring-grad2)" strokeWidth="0.8" strokeDasharray="30 10" />
            </svg>
          )}

          {/* LOGO */}
          <img
            src="/logo-sm-depannage.png"
            alt="SM Dépannage"
            className="relative z-10 w-full h-auto object-contain select-none"
            style={{
              maxWidth: 500,
              filter: mounted
                ? 'drop-shadow(0 0 32px rgba(220,38,38,0.8)) drop-shadow(0 0 80px rgba(220,38,38,0.4)) drop-shadow(0 0 4px rgba(255,255,255,0.6))'
                : 'none',
              animation: 'logo-entrance 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards, logo-float 6s ease-in-out 1.2s infinite',
              opacity: 0,
            }}
          />

          {/* Reflet sol */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16"
            style={{
              background: 'linear-gradient(to bottom, rgba(220,38,38,0.25), transparent)',
              filter: 'blur(12px)',
              transform: 'translateX(-50%) scaleY(-1) translateY(-8px)',
            }} />
        </div>

        {/* ── TITRE ── */}
        <div className="text-center space-y-4">
          <h1 className="font-black text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}>
            Dépannage automobile
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: mounted ? 'drop-shadow(0 0 20px rgba(220,38,38,0.6))' : 'none',
            }}>
              rapide & fiable
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto">
            Nous arrivons en <strong className="text-red-400">20–30 min</strong> sur Lille et toute la région Nord–Pas-de-Calais.
          </p>
        </div>

        {/* ── BOUTONS CTA ── */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <a href={`tel:${PHONE}`}
            className="group relative flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-bold text-lg text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              boxShadow: '0 0 30px rgba(220,38,38,0.5), 0 4px 20px rgba(0,0,0,0.4)',
              border: '1px solid rgba(239,68,68,0.5)',
            }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Appeler maintenant
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>

          <a href="/contact"
            className="flex-1 flex items-center justify-center px-8 py-5 rounded-xl font-bold text-lg text-white transition-all duration-300"
            style={{
              border: '1px solid rgba(148,163,184,0.3)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
            }}>
            Demander intervention
          </a>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg border-t border-white/10 pt-8 mt-2">
          {[
            { val: '20–30', unit: 'min', label: 'Intervention' },
            { val: '24/7', unit: '', label: 'Disponible' },
            { val: '59/62', unit: '', label: 'Couverture' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-red-500">{s.val}<span className="text-base text-red-400">{s.unit}</span></div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── KEYFRAMES ── */}
      <style jsx>{`
        @keyframes halo-pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes spin-slow    { to { transform: rotate(360deg); } }
        @keyframes spin-reverse { to { transform: rotate(-360deg); } }
        @keyframes logo-entrance {
          from { opacity: 0; transform: scale(0.75) translateY(30px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes logo-float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
