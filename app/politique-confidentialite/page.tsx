// app/politique-confidentialite/page.tsx

import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Politique de confidentialité — SM Dépannage",
  description: "Politique de confidentialité et traitement des données personnelles du site SM Dépannage.",
  alternates: { canonical: "https://votredomaine.fr/politique-confidentialite" },
  robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Politique de confidentialité" }]}
        titre="Politique de confidentialité"
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 py-16 prose prose-invert prose-headings:font-display prose-a:text-ember-400 text-white/70 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white">1. Responsable du traitement</h2>
          <p>[Raison sociale], [Adresse], contact@votredomaine.fr — est responsable du traitement de vos données personnelles.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">2. Données collectées</h2>
          <p>Via le formulaire de contact, nous collectons :</p>
          <ul>
            <li>Votre nom</li>
            <li>Votre numéro de téléphone</li>
            <li>Le lieu de votre panne</li>
            <li>Le type de panne déclaré</li>
          </ul>
          <p>Ces données sont utilisées <strong>uniquement</strong> pour répondre à votre demande de dépannage.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">3. Base légale</h2>
          <p>Le traitement repose sur l&apos;exécution d&apos;un contrat (prestation de dépannage) et votre consentement explicite lors de la soumission du formulaire.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">4. Durée de conservation</h2>
          <p>Vos données sont conservées pendant la durée nécessaire au traitement de votre demande et au maximum 1 an après le dernier contact.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">5. Destinataires des données</h2>
          <p>Vos données ne sont pas cédées, vendues ni louées à des tiers. Elles peuvent être transmises au prestataire d&apos;envoi d&apos;emails (Resend) dans le cadre strict de la gestion de vos demandes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">6. Cookies et analytics</h2>
          <p>
            Ce site utilise Plausible Analytics (sans cookie, anonymisé). Aucun cookie tiers de suivi n&apos;est déposé sur votre appareil.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white">7. Vos droits (RGPD)</h2>
          <p>Conformément au RGPD (Règlement UE 2016/679), vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Rectification :</strong> corriger des données inexactes</li>
            <li><strong>Suppression :</strong> demander l&apos;effacement de vos données</li>
            <li><strong>Opposition :</strong> vous opposer à un traitement</li>
          </ul>
          <p>Pour exercer ces droits : contact@votredomaine.fr</p>
          <p>Vous pouvez également déposer une réclamation auprès de la <a href="https://www.cnil.fr" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">CNIL</a>.</p>
        </section>
      </div>
    </>
  );
}
