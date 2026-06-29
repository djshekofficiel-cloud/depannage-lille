"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Couleur de fond : doit correspondre exactement à ink-950 pour le masquage des cônes
const BG = "#0a0e1a";
const PHONE = "07 67 87 80 34";

export function LampSection() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center text-center gap-6 px-4 max-w-3xl"
      >
        <span className="chip">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ember-400 animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-400" />
          </span>
          Disponible maintenant · 24h/24
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white text-balance leading-[1.05]">
          En panne ?{" "}
          <span className="text-gradient">On arrive en&nbsp;20&nbsp;min.</span>
        </h1>

        <p className="text-white/65 text-lg max-w-xl leading-relaxed">
          Remorquage · Batterie · Pneu · Panne moteur — intervention 24h/24 sur
          Lille et le Nord–Pas-de-Calais.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <a href={`tel:${PHONE}`} className="btn-primary text-lg">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Appeler maintenant
          </a>
          <Link href="/contact" className="btn-ghost text-lg">
            Demande de devis
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-8">
          {[
            { v: "20 min", l: "Délai moyen" },
            { v: "24/7", l: "Disponibilité" },
            { v: "+200", l: "Avis Google" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display font-bold text-2xl sm:text-3xl text-gradient">
                {s.v}
              </div>
              <div className="text-xs text-white/40 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </LampContainer>
  );
}

const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden w-full z-0",
        className
      )}
      style={{ backgroundColor: BG }}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* ── Cône gauche ─── */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, #d32f2f, transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]"
        >
          <div
            className="absolute w-full left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: BG }}
          />
          <div
            className="absolute w-40 h-full left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{ backgroundColor: BG }}
          />
        </motion.div>

        {/* ── Cône droit ─── */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, #d32f2f)",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]"
        >
          <div
            className="absolute w-40 h-full right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{ backgroundColor: BG }}
          />
          <div
            className="absolute w-full right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: BG }}
          />
        </motion.div>

        {/* Fond de masquage bas */}
        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
          style={{ backgroundColor: BG }}
        />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Halo central */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-ember-500 opacity-50 blur-3xl" />

        {/* Spot chaud */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-ember-400 blur-2xl"
        />

        {/* Ligne lumineuse */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-ember-400"
        />

        {/* Masque bas de la zone lumineuse */}
        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ backgroundColor: BG }}
        />
      </div>

      {/* Contenu centré, porté au-dessus de l'effet */}
      <div className="relative z-50 flex -translate-y-56 flex-col items-center px-5 w-full">
        {children}
      </div>
    </div>
  );
};
