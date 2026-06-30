// app/mentions-legales/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales — SM Dépannage",
  description: "Mentions légales du site SM Dépannage : éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: canonical("/mentions-legales") },
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]}
        titre="Mentions légales"
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 py-16 prose prose-invert prose-headings:font-display prose-a:text-ember-400 text-white/85 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white neon-title">Éditeur du site</h2>
          <ul className="list-none space-y-1">
            <li><strong>Nom :</strong> Slimane MANKAA</li>
            <li><strong>Raison sociale :</strong> SM Dépannage</li>
            <li><strong>Forme juridique :</strong> Entrepreneur individuel</li>
            <li><strong>SIREN :</strong> 807 790 761</li>
            <li><strong>SIRET :</strong> 807 790 761 00017</li>
            <li><strong>Numéro de TVA intracommunautaire :</strong> FR52807790761</li>
            <li><strong>Date de création :</strong> 11 août 2023</li>
            <li><strong>Activité (NAF/APE) :</strong> Commerce de voitures et de véhicules automobiles légers</li>
            <li><strong>Adresse du siège social :</strong> 105 Rue Delannoy, 59160 Lille</li>
            <li><strong>Téléphone :</strong> 07 67 87 80 34</li>
            <li><strong>Email :</strong> <a href="mailto:contact@sm-depannage59.fr" className="text-orange-400 hover:underline">contact@sm-depannage59.fr</a></li>
            <li><strong>Site web :</strong> <a href="https://www.sm-depannage59.fr" className="text-orange-400 hover:underline">www.sm-depannage59.fr</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Directeur de la publication</h2>
          <p>Slimane MANKAA, en qualité d&apos;entrepreneur individuel.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Hébergeur</h2>
          <ul className="list-none space-y-1">
            <li><strong>Hébergeur :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</li>
            <li><strong>Site :</strong>{" "}
              <a href="https://vercel.com" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Propriété intellectuelle</h2>
          <p>
            Le contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive
            de Slimane MANKAA — SM Dépannage. Toute reproduction, même partielle, est interdite
            sans autorisation préalable et écrite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Données personnelles</h2>
          <p>
            Les informations collectées via le formulaire de contact (nom, téléphone, message)
            sont utilisées uniquement pour répondre à vos demandes. Elles ne sont pas transmises
            à des tiers. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification
            et de suppression de vos données en nous contactant à{" "}
            <a href="mailto:contact@sm-depannage59.fr" className="text-orange-400 hover:underline">contact@sm-depannage59.fr</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Responsabilité</h2>
          <p>
            L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
            publiées sur ce site. Il se réserve le droit de corriger le contenu à tout moment
            et sans préavis. La responsabilité de l&apos;éditeur ne peut être engagée en cas
            d&apos;inexactitude ou d&apos;omission portant sur des informations disponibles sur ce site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Cookies</h2>
          <p>
            Ce site utilise Google Analytics 4 pour mesurer l&apos;audience de manière anonyme.
            Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Contact</h2>
          <p>Pour toute question concernant ce site, contactez-nous via{" "}
            <Link href="/contact" className="text-orange-400 hover:underline">notre formulaire de contact</Link>{" "}
            ou par téléphone au <a href="tel:0767878034" className="text-orange-400 hover:underline">07 67 87 80 34</a>.
          </p>
        </section>

        <p className="text-xs text-white/40 pt-4 border-t border-white/10">
          Dernière mise à jour : 30 juin 2026
        </p>
      </div>
    </>
  );
}
