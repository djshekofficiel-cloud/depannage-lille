// lib/seo/quality.ts
// Système anti-pages-satellites.
//
// Une page locale combinée (service × ville) ne devient indexable QUE si elle
// apporte un contenu local RÉEL et distinctif. À défaut, elle reste accessible
// (pour être complétée) mais en `noindex` et hors du sitemap.
//
// Principe : on n'invente jamais de données. Tant que la ville n'a pas de
// `quartiers`, `preuvesLocales`, `introductionLocale` et `faqLocale` réels et que
// son flag `indexable` n'est pas explicitement passé à true, la combinaison est
// jugée non indexable.

import type { Service } from "@/lib/services";
import type { Ville } from "@/lib/villes";

export interface QualityResult {
  indexable: boolean;
  reasons: string[];
}

const PLACEHOLDER_PATTERN = /TODO|example\.fr|xxxxx|à compléter|lorem ipsum|\bXX\b/i;

function isFilled(value?: string): boolean {
  return typeof value === "string" && value.trim().length > 0 && !PLACEHOLDER_PATTERN.test(value);
}

function hasItems(value?: unknown[], min = 1): boolean {
  return Array.isArray(value) && value.length >= min;
}

/**
 * Évalue si une page combinée service × ville peut être indexée.
 * Retourne le verdict + la liste des raisons (utile pour `seo:check`).
 */
export function evaluateLocalPageQuality(service: Service, city: Ville): QualityResult {
  const reasons: string[] = [];

  // 1. Service réellement proposé.
  if (service.indexable === false) {
    reasons.push(`Service "${service.nom}" marqué non confirmé (indexable: false).`);
  }

  // 2. Ville activée explicitement.
  if (city.indexable !== true) {
    reasons.push(`Ville "${city.nom}" non activée (indexable !== true).`);
  }

  // 3. Introduction locale spécifique (non templatée), suffisamment dense.
  if (!isFilled(city.introductionLocale) || (city.introductionLocale?.trim().length ?? 0) < 180) {
    reasons.push(`Introduction locale absente ou trop courte pour "${city.nom}".`);
  }

  // 4. Au moins une preuve / information locale réelle.
  if (!hasItems(city.preuvesLocales)) {
    reasons.push(`Aucune preuve locale réelle (preuvesLocales) pour "${city.nom}".`);
  }

  // 5. Quartiers / secteurs réellement desservis.
  if (!hasItems(city.quartiers, 2)) {
    reasons.push(`Moins de 2 quartiers/secteurs renseignés pour "${city.nom}".`);
  }

  // 6. FAQ locale non vide et propre à la ville.
  if (!hasItems(city.faqLocale)) {
    reasons.push(`FAQ locale vide pour "${city.nom}".`);
  }

  // 7. Aucun placeholder résiduel dans le contenu visible.
  const visible = [
    city.introductionLocale ?? "",
    ...(city.preuvesLocales ?? []),
    ...(city.faqLocale ?? []).flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  if (PLACEHOLDER_PATTERN.test(visible)) {
    reasons.push(`Placeholder résiduel détecté dans le contenu local de "${city.nom}".`);
  }

  return { indexable: reasons.length === 0, reasons };
}

/** Liste des combinaisons service × ville validées pour l'indexation. */
export function indexableCombos(services: Service[], villes: Ville[]): Array<{ service: Service; city: Ville }> {
  const out: Array<{ service: Service; city: Ville }> = [];
  for (const service of services) {
    for (const city of villes) {
      if (evaluateLocalPageQuality(service, city).indexable) {
        out.push({ service, city });
      }
    }
  }
  return out;
}
