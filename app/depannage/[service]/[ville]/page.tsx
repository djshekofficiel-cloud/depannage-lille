// app/depannage/[service]/[ville]/page.tsx
// Page combinée Service × Ville, protégée par le garde anti-pages-satellites.
//
// - generateStaticParams() ne pré-rend QUE les combinaisons validées (utiles).
// - Les autres combinaisons restent accessibles (rendu à la demande) mais en
//   noindex et exclues du sitemap, le temps d'être enrichies de contenu local réel.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Service, WithContext } from "schema-dts";
import { services, getServiceBySlug } from "@/lib/services";
import { villes } from "@/lib/villes";
import { SITE_URL, canonical, PHONE_DISPLAY, PHONE_TEL, SITE_NAME } from "@/lib/site";
import { evaluateLocalPageQuality, indexableCombos } from "@/lib/seo/quality";
import { JsonLd } from "@/components/seo/JsonLd";
import { Nap } from "@/components/seo/Nap";

interface Props {
  params: { service: string; ville: string };
}

// Pré-rend uniquement les combinaisons validées (aucune par défaut, anti-satellite).
export function generateStaticParams() {
  return indexableCombos(services, villes).map(({ service, city }) => ({
    service: service.slug,
    ville: city.slug,
  }));
}

function resolve(params: Props["params"]) {
  const service = getServiceBySlug(params.service);
  const city = villes.find((v) => v.slug === params.ville);
  return { service, city };
}

function localFaq(serviceName: string, city: NonNullable<ReturnType<typeof resolve>["city"]>) {
  // FAQ locale réelle si renseignée, sinon FAQ factuelle dérivée des données réelles.
  if (city.faqLocale && city.faqLocale.length > 0) return city.faqLocale;
  return [
    {
      question: `Intervenez-vous 24h/24 pour un ${serviceName.toLowerCase()} à ${city.nom} ?`,
      answer: `Oui. Notre service de ${serviceName.toLowerCase()} à ${city.nom} (${city.cp}) est disponible 24h/24 et 7j/7, jours fériés inclus.`,
    },
    {
      question: `Quel est le délai d'intervention à ${city.nom} ?`,
      answer: `Le délai moyen constaté à ${city.nom} est de ${city.delai}, via ${city.axes}. Il peut varier selon le trafic et la localisation exacte.`,
    },
    {
      question: `Le tarif est-il connu avant l'intervention à ${city.nom} ?`,
      answer: `Oui. Le tarif est annoncé par téléphone avant tout déplacement, sans engagement. Appelez le ${PHONE_DISPLAY} pour un devis gratuit.`,
    },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const { service, city } = resolve(params);
  if (!service || !city) return {};

  const path = `/depannage/${service.slug}/${city.slug}`;
  const { indexable } = evaluateLocalPageQuality(service, city);

  const title = `${service.nom} à ${city.nom} (${city.cp}) — 24h/24 | ${SITE_NAME}`;
  const description = `${service.resume} À ${city.nom} (${city.dept}), intervention en ${city.delai}, 24h/24 et 7j/7. Devis gratuit au ${PHONE_DISPLAY}.`;

  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    // Tant que le contenu local n'est pas distinctif : noindex, follow.
    robots: { index: indexable, follow: true },
    openGraph: { title, description, url: canonical(path) },
  };
}

export default function DepannageVillePage({ params }: Props) {
  const { service, city } = resolve(params);
  if (!service || !city) notFound();

  const path = `/depannage/${service.slug}/${city.slug}`;
  const url = canonical(path);
  const faq = localFaq(service.nom, city);
  const nearby = villes.filter((v) => v.slug !== city.slug && v.dept === city.dept).slice(0, 6);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const serviceLd: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.nom} à ${city.nom}`,
    serviceType: service.nom,
    description: service.description,
    url,
    areaServed: { "@type": "City", name: city.nom },
    provider: {
      "@type": "AutoRepair",
      name: SITE_NAME,
      telephone: PHONE_DISPLAY,
      url: SITE_URL,
    },
  };

  const breadcrumbLd: WithContext<import("schema-dts").BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: service.nom, item: canonical(`/services/${service.slug}`) },
      { "@type": "ListItem", position: 3, name: city.nom, item: url },
    ],
  };

  const faqLd: WithContext<import("schema-dts").FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[serviceLd, breadcrumbLd, faqLd]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="container-x py-16">
          <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-white/85">
            <Link href="/" className="hover:text-ember-300">Accueil</Link>
            <span className="mx-2 text-white/25">/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-ember-300">{service.nom}</Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/80">{city.nom}</span>
          </nav>
          <span className="chip mb-4">{city.dept === "59" ? "Nord" : "Pas-de-Calais"} · 24h/24</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white neon-title text-balance max-w-3xl">
            {service.nom} à {city.nom}
          </h1>
          <p className="text-white/65 text-lg mt-5 max-w-2xl text-pretty">
            {service.resume} Intervention en {city.delai} à {city.nom} ({city.cp}), 24h/24 et 7j/7.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={`tel:${PHONE_TEL}`} className="btn-primary text-lg">Appeler maintenant</a>
            <Link href="/contact" className="btn-ghost text-lg">Demander un devis</Link>
          </div>
        </div>
      </section>

      <div className="container-x py-16 max-w-4xl">
        {/* Introduction locale */}
        <p className="text-white/75 text-lg leading-relaxed mb-10">
          {city.introductionLocale ?? `Besoin d'un ${service.nom.toLowerCase()} à ${city.nom} ? SM Dépannage intervient sur tout le secteur (${city.axes}) avec un délai moyen de ${city.delai}.`}
        </p>

        {/* Déroulé / contenu service (réel) */}
        <div className="prose prose-invert prose-headings:font-display max-w-none text-white/75 leading-relaxed whitespace-pre-line mb-12">
          {service.contenu}
        </div>

        {/* Quartiers / preuves locales si renseignés */}
        {(city.quartiers?.length || city.preuvesLocales?.length) ? (
          <div className="card border-gradient p-6 mb-12">
            {city.quartiers?.length ? (
              <p className="text-white/80 mb-3">
                <span className="font-semibold text-white">Secteurs desservis : </span>
                {city.quartiers.join(", ")}.
              </p>
            ) : null}
            {city.preuvesLocales?.length ? (
              <ul className="list-disc list-inside text-white/70 space-y-1">
                {city.preuvesLocales.map((p) => <li key={p}>{p}</li>)}
              </ul>
            ) : null}
          </div>
        ) : null}

        {/* NAP */}
        <div className="card p-6 mb-12">
          <h2 className="font-display text-xl font-bold text-white neon-title mb-4">Nous contacter à {city.nom}</h2>
          <Nap ville={city.nom} />
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white neon-title mb-6">Questions fréquentes — {service.nom} à {city.nom}</h2>
          <div className="space-y-4">
            {faq.map((f) => (
              <details key={f.question} className="card p-5 group">
                <summary className="font-semibold text-white cursor-pointer list-none flex justify-between gap-4">
                  {f.question}
                  <span aria-hidden className="text-white/40 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-white/70 mt-3 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative card border-gradient p-8 overflow-hidden mb-12">
          <h2 className="font-display text-white neon-title font-bold text-2xl mb-3">{service.nom} à {city.nom} maintenant ?</h2>
          <p className="text-white/75 mb-6">Disponible 24h/24, 7j/7. Tarif annoncé avant intervention.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`tel:${PHONE_TEL}`} className="btn-primary text-lg">Appeler le {PHONE_DISPLAY}</a>
            <Link href="/contact" className="btn-ghost text-lg">Envoyer une demande</Link>
          </div>
        </div>

        {/* Maillage interne */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-lg font-bold text-white neon-title mb-3">Autres services à {city.nom}</h2>
            <div className="flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/depannage/${s.slug}/${city.slug}`} className="glass rounded-full text-white/85 hover:text-ember-300 text-sm px-3 py-1.5 transition-colors">
                  {s.nom}
                </Link>
              ))}
            </div>
            <Link href={`/services/${service.slug}`} className="inline-block mt-4 text-sm text-ember-300 hover:underline">
              ← Tout savoir sur le {service.nom.toLowerCase()}
            </Link>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-white neon-title mb-3">{service.nom} dans le {city.dept}</h2>
            <div className="flex flex-wrap gap-2">
              {nearby.map((v) => (
                <Link key={v.slug} href={`/depannage/${service.slug}/${v.slug}`} className="glass rounded-full text-white/85 hover:text-ember-300 text-sm px-3 py-1.5 transition-colors">
                  {v.nom}
                </Link>
              ))}
            </div>
            <Link href={`/zones-intervention/${city.slug}`} className="inline-block mt-4 text-sm text-ember-300 hover:underline">
              ← Dépannage à {city.nom}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
