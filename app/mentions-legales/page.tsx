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
            <li><strong>Raison sociale :</strong> [À compléter]</li>
            <li><strong>Forme juridique :</strong> [SARL / SAS / Auto-entrepreneur]</li>
            <li><strong>SIRET :</strong> [À compléter]</li>
            <li><strong>Adresse :</strong> [À compléter]</li>
            <li><strong>Téléphone :</strong> 07 67 87 80 34</li>
            <li><strong>Email :</strong> [À compléter]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Hébergeur</h2>
          <ul className="list-none space-y-1">
            <li><strong>Hébergeur :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</li>
            <li><strong>Site :</strong> <a href="https://vercel.com" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Propriété intellectuelle</h2>
          <p>
            Le contenu de ce site (textes, images, logos) est la propriété exclusive
            de [Raison sociale]. Toute reproduction, même partielle, est interdite
            sans autorisation préalable et écrite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Responsabilité</h2>
          <p>
            L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
            publiées. Il se réserve le droit de corriger le contenu à tout moment et
            sans préavis. La responsabilité de l&apos;éditeur ne peut être engagée en cas
            d&apos;inexactitude ou d&apos;omission portant sur des informations disponibles sur
            ce site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white neon-title">Contact</h2>
          <p>Pour toute question concernant ce site, contactez-nous via{" "}
            <Link href="/contact" className="text-orange-400 hover:underline">notre formulaire de contact</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
