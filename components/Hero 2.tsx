// components/Hero.tsx — Section héros : split texte + visuel dépanneuse 3D
// Fond aurora animé, grille, duotone ember sur photo Unsplash, effets lumineux.

import Link from "next/link";
import { IMG } from "@/lib/images";
import { Spotlight } from "@/components/ui/Spotlight";

interface HeroProps {
  titre?: string;
  sousTitre?: string;
  showCTA?: boolean;
}

const PHONE = "07 67 87 80 34";

export default function Hero({
  titre = "Le dépannage auto réinventé à Lille.",
  sousTitre = "Une dépanneuse à 20 minutes de vous, 24h/24. Remorquage, batterie, pneu, panne moteur sur Lille, la MEL et les départements 59 & 62.",
  showCTA = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Fond : grille + aurora + halos + spotlights */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#d32f2f" />
        <Spotlight className="-top-20 right-20 md:right-0 opacity-50" fill="#8b0000" />
        <div className="absolute inset-0 bg-grid-faint [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="absolute -top-32 -left-24 h-[40rem] w-[40rem] rounded-full bg-sm-red-600/25 blur-[120px] animate-aurora" />
        <div className="absolute top-10 right-0 h-[34rem] w-[34rem] rounded-full bg-gold-500/15 blur-[120px] animate-aurora-slow" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20 lg:py-28">
        {/* Colonne texte */}
        <div className="animate-fade-up">
          <span className="chip mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sm-red-400 animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sm-red-400" />
            </span>
            Disponible maintenant · 24h/24
          </span>

          <h1 className="font-display font-extrabold leading-[1.05] text-4xl sm:text-5xl xl:text-6xl text-balance text-white">
            {titre}
          </h1>

          <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed text-pretty">
            {sousTitre}
          </p>

          {showCTA && (
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href={`tel:${PHONE}`} className="btn-primary text-lg group">
                <svg viewBox="0 0 24 24" className="h-5 w-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Appeler maintenant
              </a>
              <Link href="/contact" className="btn-ghost text-lg">
                Demander un devis
              </Link>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            {[
              { v: "20 min", l: "Délai moyen" },
              { v: "24/7", l: "Disponibilité" },
              { v: "+200", l: "Avis Google" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display font-bold text-2xl sm:text-3xl text-gradient">{s.v}</div>
                <div className="text-xs text-white/45 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne visuel */}
        <div className="relative perspective animate-fade-up [animation-delay:120ms]">
          <div className="group relative preserve-3d transition-transform duration-500 hover:[transform:rotateY(-6deg)_rotateX(3deg)]">
            {/* Glow derrière */}
            <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-sm-red-600/40 to-gold-500/30 blur-2xl opacity-70" />

            {/* Carte image duotone */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 shadow-glow-lg">
              <div
                className="aspect-[4/5] sm:aspect-[5/5] bg-cover bg-center"
                style={{ backgroundImage: `url('${IMG.heroTowing}')` }}
                role="img"
                aria-label="Dépanneuse SM Dépannage en intervention"
              />
              {/* Assombrissement bas + léger voile ambre (couleurs d'origine préservées) */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-sm-red-900/20 to-transparent" />
              <div aria-hidden className="absolute inset-0 noise opacity-[0.05]" />

              {/* Badge flottant bas */}
              <div className="absolute inset-x-4 bottom-4 glass-strong rounded-2xl p-4 flex items-center gap-3">
                <span className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-sm-red-500 to-gold-500 shadow-glow shrink-0">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Dépanneuse en route</p>
                  <p className="text-white/55 text-xs">Suivi en temps réel · arrivée ~20 min</p>
                </div>
              </div>
            </div>

            {/* Badge flottant haut-droit */}
            <div className="absolute -top-4 -right-3 sm:-right-5 glass rounded-2xl px-4 py-3 animate-float shadow-glow">
              <div className="font-display font-bold text-xl text-gradient leading-none">59 · 62</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">Nord & P-de-C</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
