// lib/villes.ts — Données des villes d'intervention (59 Nord + 62 Pas-de-Calais)

export interface Ville {
  slug: string;       // URL kebab-case
  nom: string;        // Nom affiché
  cp: string;         // Code postal principal
  dept: string;       // Numéro de département
  region: string;     // Nom de la région
  axes: string;       // Axes routiers principaux
  delai: string;      // Délai d'intervention estimé
  description: string; // Phrase unique pour le SEO
}

export const villes: Ville[] = [
  // ─── Département 59 – Nord ──────────────────────────────────────────────────
  {
    slug: "lille",
    nom: "Lille",
    cp: "59000",
    dept: "59",
    region: "Nord",
    axes: "A1, A22, A25, boulevard périphérique",
    delai: "20 à 30 min",
    description:
      "Capitale des Flandres, Lille est desservie par un réseau dense d'autoroutes. Notre équipe intervient sur tout le territoire lillois, de Vieux-Lille au Faubourg-de-Béthune.",
  },
  {
    slug: "roubaix",
    nom: "Roubaix",
    cp: "59100",
    dept: "59",
    region: "Nord",
    axes: "A22, A25, RN17, voie rapide urbaine",
    delai: "25 à 35 min",
    description:
      "Roubaix, ville frontalière de la métropole lilloise, est couverte en priorité sur les axes A22 et la RN17 en direction de la Belgique.",
  },
  {
    slug: "tourcoing",
    nom: "Tourcoing",
    cp: "59200",
    dept: "59",
    region: "Nord",
    axes: "A22, A27, RN17",
    delai: "25 à 35 min",
    description:
      "Tourcoing et ses alentours sont accessibles en moins de 35 minutes, avec une présence renforcée sur l'axe autoroutier A22 reliant Lille à Gand.",
  },
  {
    slug: "villeneuve-d-ascq",
    nom: "Villeneuve-d'Ascq",
    cp: "59650",
    dept: "59",
    region: "Nord",
    axes: "A27, A22, boulevard de la Paix, voie rapide",
    delai: "20 à 30 min",
    description:
      "Ville universitaire et technopolitaine, Villeneuve-d'Ascq est accessible rapidement grâce à la proximité du périphérique Est et de l'A27.",
  },
  {
    slug: "wattrelos",
    nom: "Wattrelos",
    cp: "59150",
    dept: "59",
    region: "Nord",
    axes: "A22, RN17, voie rapide urbaine",
    delai: "30 à 40 min",
    description:
      "Commune limitrophe de Roubaix, Wattrelos est desservie par la RN17 et l'A22. Intervention rapide sur les zones industrielles et résidentielles.",
  },
  {
    slug: "marcq-en-baroeul",
    nom: "Marcq-en-Barœul",
    cp: "59700",
    dept: "59",
    region: "Nord",
    axes: "A22, boulevard de Tournai, périphérique Nord",
    delai: "25 à 35 min",
    description:
      "Marcq-en-Barœul, commune résidentielle aisée du Nord, est couverte via la sortie périphérique et le boulevard de Tournai.",
  },
  {
    slug: "lambersart",
    nom: "Lambersart",
    cp: "59130",
    dept: "59",
    region: "Nord",
    axes: "A25, périphérique Ouest, avenue de Dunkerque",
    delai: "20 à 30 min",
    description:
      "Lambersart, commune résidentielle à l'Ouest de Lille, est idéalement positionnée à deux pas de l'A25 et du périphérique Ouest.",
  },
  {
    slug: "armentieres",
    nom: "Armentières",
    cp: "59280",
    dept: "59",
    region: "Nord",
    axes: "A25, D22, D933",
    delai: "35 à 45 min",
    description:
      "Armentières et la Lys frontalière sont couvertes via l'A25 et la D22. Intervention sur le centre-ville et les zones d'activités.",
  },

  // ─── Département 62 – Pas-de-Calais ─────────────────────────────────────────
  {
    slug: "lens",
    nom: "Lens",
    cp: "62300",
    dept: "62",
    region: "Pas-de-Calais",
    axes: "A21, A1, RN17, RN47",
    delai: "35 à 45 min",
    description:
      "Lens, capitale du bassin minier, est accessible via l'A21 et l'A1. Nous couvrons Lens et l'agglomération Lens-Liévin sans supplément.",
  },
  {
    slug: "lievin",
    nom: "Liévin",
    cp: "62800",
    dept: "62",
    region: "Pas-de-Calais",
    axes: "A21, RN47, D943",
    delai: "35 à 45 min",
    description:
      "Liévin, commune de l'agglomération Lens-Liévin, est couverte en synergie avec Lens. Intervention rapide sur l'A21 et les voies locales.",
  },
  {
    slug: "bethune",
    nom: "Béthune",
    cp: "62400",
    dept: "62",
    region: "Pas-de-Calais",
    axes: "A26, A21, RN41",
    delai: "40 à 50 min",
    description:
      "Béthune et son arrondissement sont couverts via l'A26 (Calais–Reims) et l'A21. Zone d'intervention étendue à Bruay, Noeux et Laventie.",
  },
  {
    slug: "arras",
    nom: "Arras",
    cp: "62000",
    dept: "62",
    region: "Pas-de-Calais",
    axes: "A1, A26, RN17, RN39",
    delai: "45 à 60 min",
    description:
      "Arras, préfecture du Pas-de-Calais, se situe à l'intersection de l'A1 (Paris–Lille) et de l'A26. Délai estimé selon la circulation sur l'A1.",
  },
  {
    slug: "henin-beaumont",
    nom: "Hénin-Beaumont",
    cp: "62110",
    dept: "62",
    region: "Pas-de-Calais",
    axes: "A1, A21, échangeur Hénin-Beaumont",
    delai: "35 à 45 min",
    description:
      "Hénin-Beaumont est idéalement positionnée sur l'A1 et l'A21. Nous intervenons sur l'échangeur autoroutier et les zones commerciales.",
  },
  {
    slug: "carvin",
    nom: "Carvin",
    cp: "62220",
    dept: "62",
    region: "Pas-de-Calais",
    axes: "A1, A21, D160",
    delai: "35 à 45 min",
    description:
      "Carvin est situé à la jonction de l'A1 et de l'A21, à la frontière Nord/Pas-de-Calais. Intervention rapide sur ce nœud autoroutier stratégique.",
  },
];

/**
 * Retourne une ville par son slug (pour les pages dynamiques).
 * @param slug – le slug URL de la ville
 */
export function getVilleBySlug(slug: string): Ville | undefined {
  return villes.find((v) => v.slug === slug);
}

/**
 * Retourne toutes les villes d'un département.
 * @param dept – "59" ou "62"
 */
export function getVillesByDept(dept: string): Ville[] {
  return villes.filter((v) => v.dept === dept);
}
