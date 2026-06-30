

import type { Metadata } from 'next';
import { villes } from '@/lib/villes';
import { SITE_URL, canonical } from '@/lib/site';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: { ville: string };
}

export function generateStaticParams() {
  return villes.map((v) => ({ ville: v.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const v = villes.find((x) => x.slug === params.ville);
  if (!v) return {};
  const path = `/zones-intervention/${v.slug}`;
  const title = `Dépannage auto ${v.nom} (${v.cp}) — 24h/24, intervention ${v.delai}`;
  const description = `Dépannage et remorquage auto à ${v.nom} (${v.dept}) : intervention en ${v.delai}, 24h/24 et 7j/7. Batterie, crevaison, panne, remorquage. Devis gratuit au 07 67 87 80 34.`;
  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: { title: `${title} — SM Dépannage`, description, url: canonical(path) },
  };
}

export default function VillePage({ params }: Props) {
  const v = villes.find((x) => x.slug === params.ville);
  if (!v) return notFound();

  const otherCities = villes.filter(c => c.slug !== v.slug).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: `SM Dépannage — ${v.nom}`,
    areaServed: { '@type': 'City', 'name': v.nom },
    address: {
      '@type': 'PostalAddress',
      addressLocality: v.nom,
      postalCode: v.cp,
      addressCountry: 'FR',
    },
    telephone: '07 67 87 80 34',
    availableLanguage: 'fr',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: v.lat,
      longitude: v.lng,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: "Zones d'intervention", item: `${SITE_URL}/zones-intervention` },
      { '@type': 'ListItem', position: 3, name: v.nom, item: canonical(`/zones-intervention/${v.slug}`) },
    ],
  };

  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
      />

      {/* Hero zone */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-black to-black border-b border-red-500/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-lg bg-red-950/50 border border-red-500/50 text-red-300 text-sm font-semibold mb-4">
              {v.dept === '59' ? 'Nord' : 'Pas-de-Calais'}
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white neon-title mb-6">
              Dépannage auto à <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">{v.nom}</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Intervention rapide en <span className="text-red-400 font-bold">{v.delai}</span> • 24h/24, 7j/7 • Tous services
            </p>
            <a
              href="tel:07 67 87 80 34"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all"
            >
              📞 Appeler maintenant
            </a>
          </div>
        </div>
      </section>

      {/* Intervention details */}
      <section className="py-16 md:py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-black text-red-500 mb-2">{v.delai}</div>
              <p className="text-slate-300">Délai d&apos;intervention moyen</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-black text-blue-400 mb-2">{v.cp}</div>
              <p className="text-slate-300">Code postal</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800">
              <div className="text-3xl font-black text-green-400 mb-2">24/7</div>
              <p className="text-slate-300">Disponibilité</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-white neon-title mb-6">Zones desservies à {v.nom}</h2>
          <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-8 mb-8">
            <p className="text-slate-300 text-lg mb-4">
              <span className="font-bold text-white">Axes routiers : </span>
              {v.axes}
            </p>
            <p className="text-slate-300 text-lg">
              <span className="font-bold text-white">Délai moyen : </span>
              {v.delai}
            </p>
          </div>

          <h2 className="text-3xl font-black text-white neon-title mb-6">Services disponibles à {v.nom}</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: '🚗', title: 'Remorquage', desc: 'Transport sécurisé de votre véhicule' },
              { icon: '🔧', title: 'Dépannage sur place', desc: 'Réparation immédiate si possible' },
              { icon: '🔋', title: 'Batterie', desc: 'Changement et recharge 24/7' },
              { icon: '⚙️', title: 'Crevaison', desc: 'Réparation rapide de pneu' },
              { icon: '📍', title: 'Rapatriement', desc: 'Assistance routière complète' },
              { icon: '✓', title: 'Urgence', desc: 'Intervention immédiate garantie' },
            ].map((service, i) => (
              <div key={i} className="p-4 bg-slate-900/30 border border-slate-800 rounded-lg">
                <div className="text-3xl mb-2">{service.icon}</div>
                <h3 className="font-bold text-white neon-title mb-1">{service.title}</h3>
                <p className="text-slate-300 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white neon-title mb-6">Vous avez besoin de nous?</h2>
          <p className="text-xl text-slate-300 mb-8">Appelez-nous maintenant, notre équipe intervient en {v.delai}</p>
          <a
            href="tel:07 67 87 80 34"
            className="inline-block px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all"
          >
            ☎️ Appeler maintenant
          </a>
        </div>
      </section>

      {/* Other cities */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-black text-white neon-title mb-12 text-center">Autres zones d&apos;intervention</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCities.map((city) => (
              <Link
                key={city.slug}
                href={`/zones-intervention/${city.slug}`}
                className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-red-500/50 hover:bg-red-950/20 transition-all text-center group"
              >
                <h3 className="font-bold text-white neon-title group-hover:text-red-400 transition-colors">{city.nom}</h3>
                <p className="text-sm text-slate-300 mt-1">{city.cp}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
