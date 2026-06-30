// app/a-propos/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { IMG } from "@/lib/images";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos — SM Dépannage, dépanneurs professionnels Lille",
  description:
    "Qui sommes-nous ? SM Dépannage, équipe de dépanneurs professionnels basés à Lille. Dépannage voitures, motos et utilitaires dans le 59 et le 62 depuis + de 10 ans.",
  alternates: { canonical: canonical("/a-propos") },
};

const PHONE = "07 67 87 80 34";

const VALEURS = [
  { titre: "Réactivité", texte: "Nous visons 20–30 min d'intervention sur la MEL.", icon: "M13 2 3 14h7l-1 8 10-12h-7l1-8z" },
  { titre: "Honnêteté", texte: "Devis annoncé avant l'intervention. Jamais de surprise.", icon: "M9 12l2 2 4-4 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
  { titre: "Professionnalisme", texte: "Équipe formée, véhicules assurés, matériel professionnel.", icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        kicker="Notre histoire"
        titre={<>Des dépanneurs locaux, <span className="text-gradient">pas un call-center.</span></>}
        sous="Une équipe lilloise au service des automobilistes et motards du Nord–Pas-de-Calais depuis plus de 10 ans."
      />

      <div className="container-x py-10 max-w-5xl">
        <div className="card-glow-orange overflow-hidden">
          <div className="card-glow-top" aria-hidden />
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1]">
            <Image
              src={IMG.team}
              alt="Équipe SM Dépannage et flotte de dépanneuses à Lille"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      <div className="container-x py-16 max-w-4xl space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-white neon-title mb-3">Notre histoire</h2>
          <p className="text-white/65 leading-relaxed">
            SM Dépannage est née d&apos;un constat simple : trop d&apos;automobilistes et de motards en panne attendent
            des heures sur le bord de la route avant d&apos;être secourus. Notre fondateur, fort de 15 ans
            d&apos;expérience dans la mécanique automobile et deux-roues, a décidé de créer un service de dépannage réactif,
            transparent et humain, basé à Lille.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-white neon-title mb-6">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VALEURS.map((v) => (
              <div key={v.titre} className="card p-6 text-center">
                <span className="mx-auto grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-ember-500/20 to-gold-500/10 border border-ember-500/30 mb-4">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-ember-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={v.icon} />
                  </svg>
                </span>
                <p className="font-display text-white font-bold mb-1">{v.titre}</p>
                <p className="text-white/75 text-sm">{v.texte}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-white neon-title mb-3">Notre zone d&apos;action</h2>
          <p className="text-white/65 leading-relaxed">
            Basés à Lille, nous rayonnons sur toute la Métropole Européenne de Lille ainsi que sur le
            département du Nord (59) et le Pas-de-Calais (62). Nos équipes connaissent parfaitement les axes
            autoroutiers A1, A22, A25, A26 et A27, et peuvent intervenir rapidement sur tout l&apos;arrondissement
            Lens-Liévin, l&apos;agglomération arrageoise ou encore le bassin béthunois.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-white neon-title mb-4">Certifications & assurances</h2>
          <ul className="space-y-2.5 text-white/65">
            {[
              "Assurance responsabilité civile professionnelle",
              "Assurance transport de véhicules tiers",
              "Carte professionnelle dépanneur-remorqueur",
              "Formation sécurité autoroute (balisage, EPI)",
            ].map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="text-ember-500 mt-1">◆</span>{c}
              </li>
            ))}
          </ul>
        </section>

        <div className="relative overflow-hidden rounded-[1.75rem] border-gradient card p-8 text-center">
          <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full bg-ember-500/20 blur-3xl" />
          <h2 className="relative font-display text-white neon-title font-extrabold text-2xl mb-3">Vous avez besoin de nous ?</h2>
          <a href={`tel:${PHONE}`} className="relative btn-primary text-lg">Appeler SM Dépannage</a>
        </div>
      </div>
    </>
  );
}
