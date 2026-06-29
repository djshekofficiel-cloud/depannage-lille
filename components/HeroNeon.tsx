'use client';

import { useEffect, useState } from 'react';

const PHONE = '07 67 87 80 34';

export function HeroNeon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Fond avec gradient radial intense */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-black" />

      {/* Grille animée subtile */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,0,0,.05) 25%, rgba(255,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,0,0,.05) 75%, rgba(255,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,0,0,.05) 25%, rgba(255,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(255,0,0,.05) 75%, rgba(255,0,0,.05) 76%, transparent 77%, transparent)',
        backgroundSize: '80px 80px'
      }} />

      {/* Halos lumineux arrière */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Halo rouge principal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/25 blur-3xl animate-pulse" style={{ animation: 'glow-pulse 4s ease-in-out infinite' }} />

        {/* Halo bleu secondaire */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-3xl animate-pulse" style={{ animation: 'glow-pulse 5s ease-in-out infinite 1s' }} />

        {/* Halo blanc central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 container-x max-w-5xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Logo avec contour néon lumineux */}
          <div className="relative w-full h-96 sm:h-[450px] md:h-[500px] flex items-center justify-center perspective group">
            {/* Ombre profonde */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-t from-red-600/30 to-transparent blur-3xl opacity-70" />

            {/* Contour néon bleu-rouge animé */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              animation: mounted ? 'neon-glow 3s ease-in-out infinite' : 'none',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3), inset 0 0 30px rgba(59, 130, 246, 0.2)',
            }} />

            {/* Cercle de néon */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60 animate-spin-slow"
              style={{ animation: 'spin-slow 20s linear infinite' }}
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="url(#neon-gradient)"
                strokeWidth="2"
                opacity="0.5"
              />
              <defs>
                <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Logo SVG avec animation */}
            <div className="relative animate-fade-in-scale" style={{
              animation: 'fade-in-scale 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              filter: 'drop-shadow(0 0 40px rgba(239, 68, 68, 0.5)) drop-shadow(0 0 80px rgba(59, 130, 246, 0.2))',
            }}>
              <svg
                width="380"
                height="380"
                viewBox="0 0 1254 1254"
                className="drop-shadow-2xl"
              >
                <image
                  href="/logo-sm-depannage.svg"
                  width="1254"
                  height="1254"
                  preserveAspectRatio="xMidYMid meet"
                />
              </svg>
            </div>

            {/* Reflets lumineux flottants */}
            <div className="absolute top-12 left-1/4 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-2xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
            <div className="absolute bottom-16 right-1/4 w-40 h-40 bg-gradient-to-tl from-blue-500/15 to-transparent rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite -3s' }} />
          </div>

          {/* Contenu textuel */}
          <div className="flex flex-col items-center justify-center gap-6 max-w-3xl text-center">
            {/* Titre principal cinématographique */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white leading-tight tracking-tighter">
              Dépannage
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                24h/24
              </span>
            </h1>

            {/* Sous-titre avec style */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Intervention rapide et professionnelle. Nous arrivons en <span className="text-red-400 font-bold">20-30 minutes</span> sur Lille et toute la région.
            </p>

            {/* Badge de confiance */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg border border-red-500/40 bg-red-950/20 backdrop-blur-sm hover:border-red-500/60 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-semibold text-red-200">Disponible maintenant</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg border border-blue-500/40 bg-blue-950/20 backdrop-blur-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-semibold text-blue-200">Techniciens qualifiés</span>
              </div>
            </div>
          </div>

          {/* CTA Boutons premium */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center pt-4">
            {/* Bouton primaire - Appeler */}
            <a
              href={`tel:${PHONE}`}
              className="group relative px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/60 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 overflow-hidden text-lg border-2 border-red-500/50 hover:border-red-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Appeler maintenant</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>

            {/* Bouton secondaire */}
            <button
              className="px-10 py-5 border-2 border-slate-400 text-slate-200 font-bold rounded-xl transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/20 active:bg-white/10 text-lg"
            >
              Demander intervention
            </button>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800 w-full mt-8">
            <div className="text-center">
              <div className="text-3xl font-black text-red-500">20-30</div>
              <p className="text-sm text-slate-400 mt-2">Minutes<br className="sm:hidden" /> d&apos;intervention</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">59/62</div>
              <p className="text-sm text-slate-400 mt-2">Couverture<br className="sm:hidden" /> régionale</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">24/7</div>
              <p className="text-sm text-slate-400 mt-2">Disponibilité<br className="sm:hidden" /> totale</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes neon-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2),
                        inset 0 0 20px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.6), 0 0 80px rgba(239, 68, 68, 0.3),
                        inset 0 0 30px rgba(59, 130, 246, 0.2);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
        }

        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .perspective {
          perspective: 1200px;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
