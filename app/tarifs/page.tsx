// app/tarifs/page.tsx

import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Tarifs dépannage auto Lille — Prix remorquage & intervention",
  description:
    "Tarifs transparents pour le dépannage et le remorquage auto à Lille et dans le 59/62. Devis gratuit par téléphone avant toute intervention.",
  alternates: { canonical: "https://votredomaine.fr/tarifs" },
};

const PHONE = "07 67 87 80 34";

const TARIFS = [
  {
    service: "Remorquage",
    base: "dès 80 €",
    detail: "Tarif de base sur Lille intra-muros. Supplément kilométrique selon destination.",
    featured: true,
    badge: "Le plus demandé",
  },
  {
    service: "Batterie à plat",
    base: "dès 60 €",
    detail: "Démarrage d'urgence inclus. Remplacement de batterie en supplément selon modèle.",
  },
  {
    service: "Crevaison / Pneu",
    base: "dès 50 €",
    detail: "Montage de la roue de secours. Remplacement de pneu en supplément.",
  },
  {
    service: "Dépannage sur place",
    base: "dès 70 €",
    detail: "Diagnostic OBD inclus. Réparation simple sur route si possible.",
  },
  {
    service: "Transport sur plateau",
    base: "Sur devis",
    detail: "Prix selon distance et type de véhicule. Devis gratuit en 5 min.",
  },
  {
    service: "Supplément nuit / JF",
    base: "+20 à 30 %",
    detail: "Applicable de 21h à 7h et les jours fériés.",
  },
];

export default function TarifsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Tarifs" }]}
        kicker="Tarifs"
        titre={<>Des prix clairs, <span className="text-gradient">annoncés avant intervention.</span></>}
        sous="Vous connaissez le coût avant notre départ. Devis gratuit par téléphone en moins de 5 minutes, sans frais cachés."
      />

      <section className="container-x py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 mb-10">
          <div className="card p-7 sm:p-8 border-gradient">
            <p className="chip mb-4">Comment nous calculons votre prix</p>
            <h2 className="font-display font-bold text-white text-2xl sm:text-3xl text-balance">
              Un devis détaillé avant validation
            </h2>
            <p className="text-white/65 mt-4 leading-relaxed">
              Le montant dépend du type de panne, de la zone d&apos;intervention et de l&apos;horaire.
              Vous validez toujours le prix avant toute intervention.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              {[
                "Base d'intervention selon le service",
                "Supplément distance uniquement si trajet long",
                "Majoration nuit / jours fériés annoncée à l'avance",
                "Aucun coût caché ajouté après l'intervention",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="text-sm-red-400 mt-0.5">●</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-7 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Urgence</p>
            <h3 className="font-display text-2xl font-bold text-white mt-2">Besoin d&apos;un prix immédiat ?</h3>
            <p className="text-white/65 mt-3 text-sm leading-relaxed">
              Donnez votre position et votre type de panne. Nous vous annonçons un tarif clair en direct.
            </p>
            <a href={`tel:${PHONE}`} className="btn-primary w-full mt-6 text-center">Appeler pour un devis immédiat</a>
            <p className="text-white/45 text-xs mt-3">Réponse en général en moins de 3 sonneries.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TARIFS.map((item) => (
            <div key={item.service} className={`card p-6 ${item.featured ? "border-gradient" : ""}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-display text-lg font-bold text-white">{item.service}</p>
                {item.badge ? <span className="chip !px-2.5 !py-1 !text-[10px]">{item.badge}</span> : null}
              </div>
              <p className="text-gradient font-display font-extrabold text-3xl mb-3">{item.base}</p>
              <p className="text-white/65 text-sm leading-relaxed">{item.detail}</p>
              <a href={`tel:${PHONE}`} className="mt-5 inline-flex text-sm font-semibold text-sm-red-300 hover:text-sm-red-200 transition-colors">
                Appeler pour ce tarif →
              </a>
            </div>
          ))}
        </div>

        <div className="card p-7 mb-12">
          <h2 className="font-display text-white font-bold text-lg mb-4">Comment est calculé le tarif ?</h2>
          <ul className="space-y-2.5 text-white/70 text-sm">
            {[
              <>Le tarif de base comprend le déplacement dans la zone concernée et l&apos;intervention simple.</>,
              <>Un supplément kilométrique s&apos;applique pour les remorquages longue distance.</>,
              <>Le devis est communiqué <strong className="text-white">avant</strong> l&apos;intervention, jamais après.</>,
              <>Paiement par CB, espèces ou virement. Facture pro disponible.</>,
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-sm-red-500 mt-1">◆</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <p className="text-white/60 mb-4">Besoin d&apos;un devis personnalisé ?</p>
          <a href={`tel:${PHONE}`} className="btn-primary text-lg">Appeler pour un devis gratuit</a>
        </div>
      </section>
    </>
  );
}
