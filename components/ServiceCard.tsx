// components/ServiceCard.tsx
// Carte service premium : image duotone + verre + glow au survol.

import Link from "next/link";
import { serviceImage } from "@/lib/images";
import { BorderBeam } from "@/components/ui/BorderBeam";

interface ServiceCardProps {
  slug: string;
  nom: string;
  icon: string;
  resume: string;
}

export default function ServiceCard({ slug, nom, resume }: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="group card overflow-hidden flex flex-col relative">
      <BorderBeam duration={10} lightColor="#d32f2f" lightWidth={160} />
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${serviceImage(slug)}')` }}
          role="img"
          aria-label={nom}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/30 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-sm-red-900/30 to-transparent opacity-70 group-hover:opacity-25 transition-opacity" />
      </div>

      {/* Contenu */}
      <div className="relative flex flex-col gap-2 p-6 flex-1">
        <h3 className="font-display text-white font-bold text-xl group-hover:text-sm-red-300 transition-colors">
          {nom}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed flex-1">{resume}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm-red-400 text-sm font-semibold">
          En savoir plus
          <svg viewBox="0 0 24 24" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
