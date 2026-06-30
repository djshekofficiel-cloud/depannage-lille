// components/seo/Nap.tsx
// Bloc NAP (Name · Address · Phone) cohérent sur toutes les pages.
// N'affiche QUE des données réelles issues de lib/site. Aucune adresse postale
// n'est inventée : si la rue n'est pas connue, on n'affiche que la zone.

import { SITE_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

type NapProps = {
  /** Ville mise en avant (zone d'intervention principale de la page). */
  ville?: string;
  className?: string;
};

export function Nap({ ville, className = "" }: NapProps) {
  const zone = ville ? `${ville} et la Métropole lilloise` : "Lille, le 59 et le 62";

  return (
    <address className={`not-italic text-sm text-white/70 ${className}`}>
      <p className="font-semibold text-white">{SITE_NAME}</p>
      <p>Zone d&apos;intervention : {zone}</p>
      <p>
        Téléphone :{" "}
        <a href={`tel:${PHONE_TEL}`} className="text-sm-red-300 hover:underline font-medium">
          {PHONE_DISPLAY}
        </a>
      </p>
      <p>Disponibilité : 24h/24, 7j/7</p>
    </address>
  );
}
