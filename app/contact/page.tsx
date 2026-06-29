// app/contact/page.tsx

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact — Demande d'intervention dépannage auto Lille",
  description:
    "Contactez SM Dépannage pour une intervention rapide à Lille et dans le Nord–Pas-de-Calais. Ou appelez directement le 07 67 87 80 34.",
  alternates: { canonical: "https://depannage-lille.vercel.app/contact" },
};

const PHONE = "07 67 87 80 34";

const INFOS = [
  { titre: "Temps de réponse", texte: "Décroché en moins de 3 sonneries", icon: "M13 2 3 14h7l-1 8 10-12h-7l1-8z" },
  { titre: "Délai d'intervention", texte: "20 à 30 min sur Lille et MEL", icon: "M12 6v6l4 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
  { titre: "Zone couverte", texte: "Dept. 59 (Nord) et 62 (Pas-de-Calais)", icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  { titre: "Tarif", texte: "Annoncé avant l'intervention, sans surprise", icon: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        kicker="Contact"
        titre={<>Décrivez votre panne, <span className="text-gradient">on vous rappelle vite.</span></>}
        sous="Service disponible 24h/24, 7j/7. Pour une urgence immédiate, appelez directement."
      />

      <section className="container-x py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Infos */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border-gradient card p-7 mb-6">
              <div aria-hidden className="absolute -top-12 right-0 h-40 w-40 rounded-full bg-sm-red-500/25 blur-3xl" />
              <h2 className="relative text-white/75 font-semibold text-sm uppercase tracking-[0.2em] mb-2">Urgence ? Appelez</h2>
              <a href={`tel:${PHONE}`} className="relative font-display text-gradient text-3xl sm:text-4xl font-extrabold">
                07 67 87 80 34
              </a>
              <p className="relative text-white/60 text-sm mt-3">24h/24 — 7j/7 — Réponse immédiate</p>
            </div>

            <div className="card p-5 mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-3">Avant de valider</p>
              <ul className="space-y-2.5 text-sm text-white/75">
                {[
                  "Prix annoncé avant intervention",
                  "Rappel rapide après envoi du formulaire",
                  "Aucune donnée revendue",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="text-sm-red-400 mt-0.5">●</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {INFOS.map((item) => (
                <div key={item.titre} className="flex items-start gap-4 card p-4">
                  <span className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-sm-red-500/20 to-gold-500/10 border border-sm-red-500/30 shrink-0">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-sm-red-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white font-semibold">{item.titre}</p>
                    <p className="text-white/65 text-sm">{item.texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div className="card p-8">
            <h2 className="font-display text-white neon-title font-bold text-xl mb-2">Envoyez votre demande</h2>
            <p className="text-white/60 text-sm mb-6">
              Décrivez brièvement la situation. On vous rappelle pour confirmer le tarif et le délai.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
