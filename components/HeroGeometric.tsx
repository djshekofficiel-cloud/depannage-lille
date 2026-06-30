"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PHONE = "07 67 87 80 34";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.12]",
            "shadow-[0_8px_32px_0_rgba(220,38,38,0.12)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroGeometric() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.4 + i * 0.18, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
  };

  return (
    <div className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Image de fond : intervention dépannage (référence SM Dépannage) */}
      <div className="absolute inset-0">
        <Image
          src="/photos/ref/intervention-moteur.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Voile sombre dégradé — garde le logo et le texte parfaitement lisibles */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,3,3,0.82) 0%, rgba(3,3,3,0.50) 42%, rgba(3,3,3,0.72) 78%, #030303 100%)",
          }}
        />
        {/* Vignette : fond les contours dans le noir */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 0%, rgba(3,3,3,0.68) 100%)",
          }}
        />
        {/* Teinte de marque rouge ↔ bleu par-dessus l'image */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/25 via-transparent to-blue-900/20" />
      </div>

      {/* Grille discrète */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Formes géométriques flottantes — aux couleurs de la marque */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-red-500/[0.18]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-blue-500/[0.16]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-red-600/[0.16]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-blue-400/[0.16]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-red-400/[0.16]" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Badge disponibilité */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/30 border border-red-500/40 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-red-300">
              Disponible 24h/24 · 7j/7
            </span>
          </motion.div>

          {/* Logo + effets lumineux (phares & gyrophares de la dépanneuse) */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="relative mb-8"
            style={{ width: "min(360px, 70vw)" }}
          >
            <Image
              src="/logo-sm-depannage-hero.png"
              alt="SM Dépannage — dépannage automobile rapide et fiable"
              width={360}
              height={360}
              priority
              className="w-full h-auto object-contain select-none"
              style={{
                filter:
                  "drop-shadow(0 0 24px rgba(220,38,38,0.7)) drop-shadow(0 0 60px rgba(220,38,38,0.35))",
              }}
            />
            {/* Phares avant — un de chaque côté de la calandre (appels de phares) */}
            <span className="hl-headlight" style={{ left: "70%", top: "56.5%" }} />
            <span className="hl-headlight" style={{ left: "78%", top: "57%", animationDelay: "0.16s" }} />
            {/* Gyrophares — sur le toit de la cabine (rouge ↔ bleu) */}
            <span className="hl-beacon hl-red" style={{ left: "64%", top: "45.5%" }} />
            <span className="hl-beacon hl-blue" style={{ left: "67.5%", top: "45.5%" }} />
          </motion.div>

          {/* Titre */}
          <motion.h1
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="tracking-tight leading-tight mb-6 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-russo), system-ui, sans-serif",
              fontSize: "clamp(0.95rem,3.8vw,2.8rem)",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
              Dépannage automobile{" "}
            </span>
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-400"
              style={{ filter: "drop-shadow(0 0 16px rgba(220,38,38,0.55))" }}
            >
              rapide &amp; fiable
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-slate-300/90 leading-relaxed font-light max-w-xl mx-auto mb-10"
            style={{ fontSize: "clamp(0.95rem,2.5vw,1.2rem)" }}
          >
            Nous arrivons en <strong className="text-red-400 font-semibold">20–30 min</strong> sur Lille
            et toute la région Nord–Pas-de-Calais. Remorquage, batterie, crevaison, panne moteur.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center"
          >
            <a
              href={`tel:${PHONE}`}
              className="group relative flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-white overflow-hidden transition-transform hover:-translate-y-0.5"
              style={{
                fontSize: "clamp(0.9rem,2.5vw,1.05rem)",
                background: "linear-gradient(135deg,#dc2626,#b91c1c)",
                boxShadow: "0 0 28px rgba(220,38,38,0.5),0 4px 20px rgba(0,0,0,0.4)",
                border: "1px solid rgba(239,68,68,0.5)",
              }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appeler maintenant
            </a>
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-bold text-white transition-all hover:bg-white/10"
              style={{
                fontSize: "clamp(0.9rem,2.5vw,1.05rem)",
                border: "1px solid rgba(148,163,184,0.3)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              Planifier une intervention
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-sm mt-12 border-t border-white/10 pt-6"
          >
            {[
              { val: "20–30", unit: " min", label: "Intervention" },
              { val: "24/7", unit: "", label: "Disponible" },
              { val: "59/62", unit: "", label: "Couverture" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-black text-red-500 leading-none" style={{ fontSize: "clamp(1.2rem,4vw,1.8rem)" }}>
                  {s.val}
                  <span className="text-red-400 text-sm">{s.unit}</span>
                </div>
                <div className="text-slate-400 mt-1 uppercase tracking-wider" style={{ fontSize: "clamp(0.6rem,1.5vw,0.7rem)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Liserés néon sur les contours haut/bas */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg,transparent,rgba(239,68,68,0.7),transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg,transparent,rgba(59,130,246,0.6),transparent)" }} />

      {/* Dégradé haut/bas pour fondu */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
