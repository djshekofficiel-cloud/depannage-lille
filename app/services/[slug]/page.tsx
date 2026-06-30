// app/services/[slug]/page.tsx — Page dynamique par service

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/lib/services";
import { villes } from "@/lib/villes";
import { serviceImage } from "@/lib/images";
import { SITE_URL, canonical } from "@/lib/site";

interface PageProps {
  params: { slug: string };
}

const PHONE = "07 67 87 80 34";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const s = getServiceBySlug(params.slug);
  if (!s) return {};
  return {
    title: s.titre,
    description: s.description,
    alternates: { canonical: canonical(`/services/${s.slug}`) },
  };
}

export default function ServicePage({ params }: PageProps) {
  const s = getServiceBySlug(params.slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.nom,
    serviceType: s.nom,
    description: s.description,
    url: canonical(path),
    provider: { "@type": "AutoRepair", name: "SM Dépannage", telephone: PHONE, url: SITE_URL },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Nord (59)" },
      { "@type": "AdministrativeArea", name: "Pas-de-Calais (62)" },
    ],
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: s.nom, item: canonical(path) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceLd, breadcrumbLd]) }}
      />
      {/* HERO SERVICE avec image */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${serviceImage(s.slug)}')` }} aria-hidden />
          <div aria-hidden className="absolute inset-0 bg-ink-950/80" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-ember-900/30 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>
        <div className="container-x py-16">
          <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-white/85">
            <Link href="/" className="hover:text-ember-300">Accueil</Link>
            <span className="mx-2 text-white/25">/</span>
            <Link href="/services" className="hover:text-ember-300">Services</Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/80">{s.nom}</span>
          </nav>
          <span className="chip mb-4">Service · 24h/24</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white neon-title text-balance max-w-3xl">{s.titre}</h1>
          <p className="text-white/65 text-lg mt-5 max-w-2xl text-pretty">{s.description}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={`tel:${PHONE}`} className="btn-primary text-lg">Appeler maintenant</a>
            <Link href="/contact" className="btn-ghost text-lg">Demander un devis</Link>
          </div>
        </div>
      </section>

      <div className="container-x py-16 max-w-4xl">
        {/* Contenu */}
        <div className="prose prose-invert prose-headings:font-display max-w-none text-white/75 leading-relaxed whitespace-pre-line mb-12">
          {s.contenu}
        </div>

        {/* CTA */}
        <div className="relative card border-gradient p-8 overflow-hidden">
          <div aria-hidden className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-ember-500/20 blur-3xl" />
          <h2 className="relative font-display text-white neon-title font-bold text-2xl mb-3">Besoin de ce service maintenant ?</h2>
          <p className="relative text-white/75 mb-6"><span className="available-green font-semibold">Disponible 24h/24, 7j/7.</span> Intervention en 20 à 30 min sur Lille et la MEL.</p>
          <div className="relative flex flex-col sm:flex-row gap-4">
            <a href={`tel:${PHONE}`} className="btn-primary text-lg">Appeler maintenant</a>
            <Link href="/contact" className="btn-ghost text-lg">Envoyer une demande</Link>
          </div>
        </div>

        {/* Autres services */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-white neon-title mb-4">Nos autres services</h2>
          <div className="flex flex-wrap gap-3">
            {services
              .filter((other) => other.slug !== s.slug)
              .map((other) => (
                <Link key={other.slug} href={`/services/${other.slug}`} className="glass rounded-full text-white/85 hover:text-ember-300 text-sm px-4 py-2 transition-colors">
                  {other.nom}
                </Link>
              ))}
          </div>
        </div>

        {/* Maillage : ce service dans les villes */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-white neon-title mb-4">{s.nom} dans votre ville</h2>
          <div className="flex flex-wrap gap-3">
            {villes.slice(0, 10).map((v) => (
              <Link
                key={v.slug}
                href={`/zones-intervention/${v.slug}`}
                className="glass rounded-full text-white/85 hover:text-ember-300 text-sm px-4 py-2 transition-colors"
              >
                {s.nom} {v.nom}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
