import Link from "next/link";
import { VEHICULES } from "@/lib/images";

export default function VehiculesSection() {
  return (
    <section className="py-16 sm:py-20 border-t border-white/5 bg-black">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-300 border border-orange-500/40 bg-orange-950/20 mb-4">
            Tous véhicules
          </span>
          <h2 className="font-black text-white leading-none" style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)" }}>
            Voitures, motos &amp; utilitaires
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Nous dépannons et remorquons tous types de véhicules légers, 24h/24 dans le Nord et le Pas-de-Calais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {VEHICULES.map((v) => (
            <div key={v.title} className="card-glow-orange p-6 sm:p-8 text-center">
              <div className="card-glow-top" aria-hidden />
              <div className="relative z-10 text-4xl sm:text-5xl mb-4 select-none" aria-hidden>
                {v.icon}
              </div>
              <h3
                className="relative z-10 font-bold text-white text-lg sm:text-xl mb-2"
                style={{ textShadow: "0 0 14px rgba(249,115,22,0.5)" }}
              >
                {v.title}
              </h3>
              <p className="relative z-10 text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-8">
          <Link href="/services/depannage-moto" className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors">
            En savoir plus sur le dépannage moto →
          </Link>
        </p>
      </div>
    </section>
  );
}
