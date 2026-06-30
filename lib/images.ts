// lib/images.ts — Photos SM Dépannage (références dépannage auto + moto)

export const IMG = {
  heroTowing: "/photos/ref/intervention-moteur.jpg",
  heroFlatbed: "/photos/ref/remorquage-suv.jpg",
  heroLoading: "/photos/ref/chargement-plateau.jpg",
  heroUrgence: "/photos/ref/urgence-autoroute.jpg",
  truckNight: "/photos/ref/batterie-nuit.jpg",
  truckStreet: "/photos/ref/professionnel-tablette.jpg",
  towSign: "/photos/ref/equipe-flotte.jpg",
  team: "/photos/ref/equipe-flotte.jpg",
  customerCare: "/photos/ref/accompagnement-client.jpg",
};

export interface RefPhoto {
  src: string;
  alt: string;
  legend: string;
  tag: string;
}

/** Galerie — visuels de référence dépannage automobile */
export const REF_GALLERY: RefPhoto[] = [
  {
    src: "/photos/ref/intervention-moteur.jpg",
    alt: "Technicien SM Dépannage diagnostiquant une panne moteur sur route",
    legend: "Diagnostic moteur sur place",
    tag: "Dépannage",
  },
  {
    src: "/photos/ref/batterie-nuit.jpg",
    alt: "Dépannage batterie à plat de nuit avec câbles de démarrage",
    legend: "Batterie à plat — intervention nocturne",
    tag: "Batterie",
  },
  {
    src: "/photos/ref/crevaison-route.jpg",
    alt: "Changement de roue après crevaison sur le bord de route",
    legend: "Crevaison — changement de roue",
    tag: "Pneu",
  },
  {
    src: "/photos/ref/remorquage-suv.jpg",
    alt: "Remorquage d'un SUV sur dépanneuse plateau",
    legend: "Remorquage sur plateau",
    tag: "Remorquage",
  },
  {
    src: "/photos/ref/chargement-plateau.jpg",
    alt: "Chargement sécurisé d'un véhicule sur dépanneuse",
    legend: "Chargement sécurisé",
    tag: "Transport",
  },
  {
    src: "/photos/ref/urgence-autoroute.jpg",
    alt: "Assistance routière urgente sur autoroute",
    legend: "Urgence autoroute 24h/24",
    tag: "Urgence",
  },
  {
    src: "/photos/ref/accompagnement-client.jpg",
    alt: "Technicien rassurant une automobiliste en panne",
    legend: "Accompagnement humain",
    tag: "Service",
  },
  {
    src: "/photos/ref/equipe-flotte.jpg",
    alt: "Équipe SM Dépannage et flotte de véhicules d'intervention",
    legend: "Notre équipe & notre flotte",
    tag: "Équipe",
  },
];

export const VEHICULES = [
  {
    icon: "🚗",
    title: "Voitures",
    desc: "Berlines, citadines, SUV, véhicules électriques et hybrides.",
  },
  {
    icon: "🏍️",
    title: "Motos & scooters",
    desc: "Remorquage sécurisé 2 roues, arrimage professionnel, scooters 50 à 125 cm³.",
  },
  {
    icon: "🚐",
    title: "Utilitaires légers",
    desc: "Camionnettes, fourgons jusqu'à 3,5 t, véhicules sans permis.",
  },
];

// Visuel par service (slug -> image référence)
export const SERVICE_IMG: Record<string, string> = {
  remorquage: "/photos/ref/remorquage-suv.jpg",
  "depannage-sur-place": "/photos/ref/intervention-moteur.jpg",
  "depannage-batterie": "/photos/ref/batterie-nuit.jpg",
  "crevaison-pneu": "/photos/ref/crevaison-route.jpg",
  "transport-vehicule": "/photos/ref/chargement-plateau.jpg",
  "depannage-moto": "/photos/ref/remorquage-suv.jpg",
};

export function serviceImage(slug: string): string {
  return SERVICE_IMG[slug] ?? IMG.heroTowing;
}
