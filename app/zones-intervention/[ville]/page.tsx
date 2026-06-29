// app/zones-intervention/[ville]/page.tsx
// Page dynamique générée statiquement pour chaque ville

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { villes, getVilleBySlug } from "@/lib/villes";
import { services } from "@/lib/services";
import { IMG } from "@/lib/images";

interface PageProps {
  params: { ville: string };
}

const PHONE = "07 67 87 80 34";

export function generateStaticParams() {
  return villes.map((v) => ({ ville: v.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const v = getVilleBySlug(params.ville);
  if (!v) return {};
  const title = `Dépannage auto ${v.nom} (${v.cp}) 24h/24 — Intervention ${v.delai}`;
  const description = `Dépannage et remorquage auto à ${v.nom} (${v.dept}) et alentours. Intervention rapide ${v.delai}, 7j/7. Axes couverts : ${v.axes}. Appelez maintenant.`;
  return {
    title,
    description,
    alternates: { canonical: `https://votredomaine.fr/zones-intervention/${v.slug}` },
    openGraph: { title, description, url: `https://votredomaine.fr/zones-intervention/${v.slug}` },
  };
}

const STAT_ICONS = {
  clock: "M12 6v6l4 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  bolt: "M13 2 3 14h7l-1 8 10-12h-7l1-8z",
};

export default function VillePage({ params }: PageProps) {
  const v = getVilleBySlug(params.ville);
  if (!v) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: `SM Dépannage — ${v.nom}`,
    telephone: "07 67 87 80 34",
    areaServed: [{ "@type": "City", name: v.nom, postalCode: v.cp }],
    address: { "@type": "PostalAddress", addressLocality: v.nom, postalCode: v.cp, addressCountry: "FR" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };

  const stats = [
    { icon: STAT_ICONS.clock, label: "Délai d'intervention", value: v.delai },
    { icon: STAT_ICONS.pin, label: "Département", value: `${v.dept} — ${v.region}` },
    { icon: STAT_ICONS.bolt, label: "Disponibilité", value: "24h/24 — 7j/7" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO VILLE */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${IMG.truckStreet}')` }} aria-hidden />
          <div aria-hidden className="absolute inset-0 bg-ink-950/80" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-ember-900/30 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>
        <div className="container-x py-16 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-white/50">
            <Link href="/" className="hover:text-ember-300">Accueil</Link>
            <span className="mx-2 text-white/25">/</span>
            <Link href="/zones-intervention" className="hover:text-ember-300">Zones</Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/80">{v.nom}</span>
          </nav>
          <span className="chip mb-4">Département {v.dept} — {v.region}</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white text-balance">
            Dépannage auto à <span className="text-gradient">{v.nom}</span> ({v.dept})
          </h1>
          <p className="text-white/65 text-lg mt-5 max-w-2xl text-pretty">
            Intervention rapide <strong className="text-white">{v.delai}</strong> sur {v.nom} et ses environs.
            Couverture des axes : <span className="text-ember-300">{v.axes}</span>.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={`tel:${PHONE}`} className="btn-primary text-lg">Appeler — Intervention {v.delai}</a>
            <Link href="/contact" className="btn-ghost text-lg">Demande de devis</Link>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="container-x py-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="card p-6 text-center">
              <span className="mx-auto grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-ember-500/20 to-gold-500/10 border border-ember-500/30 mb-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-ember-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={s.icon} />
                </svg>
              </span>
              <p className="text-white/45 text-sm mb-1">{s.label}</p>
              <p className="font-display text-white font-bold text-xl">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-white mb-4">Notre service de dépannage à {v.nom}</h2>
          <div className="space-y-4 text-white/65 leading-relaxed">
            <p>{v.description}</p>
            <p>
              Que vous soyez en panne sur <strong className="text-white/90">{v.axes}</strong>, en centre-ville ou dans
              une zone résidentielle, notre équipe de dépanneurs professionnels se déplace jusqu&apos;à vous en{" "}
              <strong className="text-white/90">{v.delai}</strong>.
            </p>
            <p>
              Nous intervenons pour tous types de pannes : batterie à plat, crevaison, panne moteur, véhicule
              accidenté nécessitant un remorquage, ou simple démarrage d&apos;urgence.
            </p>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-white mb-6">Services disponibles à {v.nom}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group card p-5 flex items-start gap-4">
              <span className="grid place-items-center h-10 w-10 rounded-lg bg-ember-500/10 border border-ember-500/20 text-ember-400 shrink-0">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14 M12 5l7 7-7 7" />
                </svg>
              </span>
              <div>
                <p className="font-display text-white font-semibold group-hover:text-ember-300 transition-colors">{service.nom}</p>
                <p className="text-white/50 text-sm">{service.resume}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border-gradient card p-8 text-center">
          <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full bg-ember-500/20 blur-3xl" />
          <h3 className="relative font-display text-white font-extrabold text-2xl mb-3">Besoin d&apos;un dépanneur à {v.nom} ?</h3>
          <p className="relative text-white/55 mb-6">Appelez-nous maintenant. Intervention en {v.delai}.</p>
          <a href={`tel:${PHONE}`} className="relative btn-primary text-lg">Appeler maintenant</a>
        </div>
      </section>

      {/* VILLES PROCHES */}
      <section className="border-t border-white/10 bg-ink-900/40 py-14">
        <div className="container-x max-w-4xl">
          <h2 className="font-display text-xl font-bold text-white mb-6">Autres zones desservies près de {v.nom}</h2>
          <div className="flex flex-wrap gap-3">
            {villes
              .filter((autre) => autre.slug !== v.slug && autre.dept === v.dept)
              .map((autre) => (
                <Link key={autre.slug} href={`/zones-intervention/${autre.slug}`} className="glass rounded-full text-white/70 hover:text-ember-300 text-sm px-4 py-2 transition-colors">
                  {autre.nom}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
