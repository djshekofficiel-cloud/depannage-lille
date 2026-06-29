'use client';

import { villes } from '@/lib/villes';
import Link from 'next/link';

export default function ZonesInterventionPage() {
  const dept59 = villes.filter(v => v.dept === '59');
  const dept62 = villes.filter(v => v.dept === '62');

  return (
    <main className="bg-black text-white">
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-black to-black border-b border-red-500/20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Zones d&apos;<span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">intervention</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            SM Dépannage intervient sur toute la région Hauts-de-France. 20-30 minutes d&apos;intervention garanties.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-black text-white mb-12">Nord (59)</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {dept59.map((v) => (
              <Link
                key={v.slug}
                href={`/zones-intervention/${v.slug}`}
                className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black border-2 border-slate-800 hover:border-red-500/50 hover:from-red-950/20 transition-all group"
              >
                <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors mb-2">{v.nom}</h3>
                <p className="text-sm text-slate-400 mb-2">{v.cp}</p>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{v.delai}</p>
              </Link>
            ))}
          </div>

          <h2 className="text-3xl font-black text-white mb-12">Pas-de-Calais (62)</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dept62.map((v) => (
              <Link
                key={v.slug}
                href={`/zones-intervention/${v.slug}`}
                className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black border-2 border-slate-800 hover:border-red-500/50 hover:from-red-950/20 transition-all group"
              >
                <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors mb-2">{v.nom}</h3>
                <p className="text-sm text-slate-400 mb-2">{v.cp}</p>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{v.delai}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Vous ne trouvez pas votre zone?</h2>
          <p className="text-lg text-slate-300 mb-8">Contactez-nous, nous couvrons toute la région Hauts-de-France!</p>
          <a
            href="tel:07 67 87 80 34"
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all"
          >
            📞 Appeler maintenant
          </a>
        </div>
      </section>
    </main>
  );
}
