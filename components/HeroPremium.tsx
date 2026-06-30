'use client';

const PHONE = '07 67 87 80 34';

export function HeroPremium() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-slate-900">
      {/* Grille de fond subtle */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }} />

      {/* Halos lumineux en arrière-plan */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Halo rouge principal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-600/20 blur-3xl animate-pulse" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />

        {/* Halo blanc secondaire */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-pulse" style={{ animation: 'pulse-glow 6s ease-in-out infinite 1s' }} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 container-x max-w-6xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Logo avec effets 3D et métalliques */}
          <div className="relative w-full h-80 sm:h-96 md:h-[450px] flex items-center justify-center perspective">
            {/* Ombre 3D profonde sous le logo */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-gradient-radial from-red-600/40 to-transparent blur-3xl opacity-60" />

            {/* Halo métallique derrière le logo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent blur-2xl opacity-70 animate-shimmer" />

            {/* Logo SVG avec animation d'entrée */}
            <div className="relative animate-fade-in-scale" style={{ animation: 'fade-in-scale 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
              <svg
                width="320"
                height="320"
                viewBox="0 0 1254 1254"
                className="drop-shadow-2xl filter brightness-110 saturate-110"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(220, 38, 38, 0.4)) drop-shadow(0 0 80px rgba(220, 38, 38, 0.2))',
                }}
              >
                <image
                  href="/logo-sm-depannage-hero.png"
                  width="1254"
                  height="1254"
                  preserveAspectRatio="xMidYMid meet"
                />
              </svg>
            </div>

            {/* Reflets métalliques blancs subtle */}
            <div className="absolute top-16 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl opacity-40" style={{ animation: 'float 6s ease-in-out infinite' }} />
            <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-white/3 rounded-full blur-3xl opacity-30" style={{ animation: 'float 8s ease-in-out infinite -2s' }} />
          </div>

          {/* Contenu textuel */}
          <div className="flex flex-col items-center justify-center gap-6 max-w-2xl text-center">
            {/* Titre principal */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight">
              Dépannage automobile
              <br />
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                rapide et fiable
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl">
              Une intervention professionnelle pour votre véhicule, où que vous soyez. Disponible 24h/24, 7j/7.
            </p>

            {/* Disponibilité 24/7 */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg border border-red-500/30 bg-red-950/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-200">Disponible maintenant 24h/24, 7j/7</span>
            </div>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            {/* Bouton principal - Appeler */}
            <a
              href={`tel:${PHONE}`}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 overflow-hidden"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Appeler maintenant</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>

            {/* Bouton secondaire - Demande */}
            <button
              className="px-8 py-4 border-2 border-slate-400 text-slate-200 font-bold rounded-lg transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5 active:bg-white/10"
            >
              Demander une intervention
            </button>
          </div>

          {/* Info complémentaire */}
          <div className="flex flex-wrap gap-6 justify-center text-center text-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl">⚡</div>
              <p className="text-slate-400">20-30 min <br /> <span className="text-slate-500 text-xs">délai moyen</span></p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl">📍</div>
              <p className="text-slate-400">Lille & MEL <br /> <span className="text-slate-500 text-xs">couverture 59/62</span></p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl">✓</div>
              <p className="text-slate-400">Techniciens <br /> <span className="text-slate-500 text-xs">professionnels</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Lignes de ciel étoilé subtle */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/10 to-transparent" />

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.8);
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
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .perspective {
          perspective: 1000px;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}
