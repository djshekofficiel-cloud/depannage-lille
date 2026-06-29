// app/zones-intervention/page.tsx — Liste de toutes les villes

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getVillesByDept, type Ville } from "@/lib/villes";

export const metadata: Metadata = {
  title: "Zones d'intervention — Dépannage auto 59 & 62",
  description:
    "SM Dépannage intervient dans tout le Nord (59) et le Pas-de-Calais (62) : Lille, Roubaix, Lens, Arras et + de 14 villes. Trouvez votre ville.",
  alternates: { canonical: "https://votredomaine.fr/zones-intervention" },
};

function VilleCard({ v }: { v: Ville }) {
  return (
    <Link href={`/zones-intervention/${v.slug}`} className="group card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-white font-bold group-hover:text-ember-300 transition-colors">{v.nom}</p>
          <p className="text-white/40 text-sm">{v.cp}</p>
        </div>
        <span className="text-ember-300 text-xs font-semibold bg-ember-500/10 px-2.5 py-1 rounded-md border border-ember-500/20 whitespace-nowrap">
          {v.delai}
        </span>
      </div>
      <p className="text-white/40 text-xs mt-3 truncate">{v.axes}</p>
    </Link>
  );
}

export default function ZonesPage() {
  const villes59 = getVillesByDept("59");
  const villes62 = getVillesByDept("62");

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Zones d'intervention" }]}
        kicker="Zones · 59 & 62"
        titre={<>Une dépanneuse <span className="text-gradient">près de chez vous.</span></>}
        sous="Nous couvrons tout le Nord (59) et le Pas-de-Calais (62). Sélectionnez votre ville pour le délai et les axes couverts."
      />

      <div className="container-x py-16 max-w-5xl">
        <section className="mb-14">
          <h2 className="flex items-center gap-3 mb-6">
            <span className="chip">Dept. 59</span>
            <span className="font-display text-2xl font-bold text-white">Nord</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {villes59.map((v) => <VilleCard key={v.slug} v={v} />)}
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-3 mb-6">
            <span className="chip">Dept. 62</span>
            <span className="font-display text-2xl font-bold text-white">Pas-de-Calais</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {villes62.map((v) => <VilleCard key={v.slug} v={v} />)}
          </div>
        </section>
      </div>
    </>
  );
}
