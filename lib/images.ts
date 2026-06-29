// lib/images.ts — Photos SM Dépannage (visuels propriétaires, dans /public/photos)

export const IMG = {
  // Héros — dépanneuse en intervention au crépuscule
  heroTowing: "/photos/hero.jpg",
  heroFlatbed: "/photos/remorquage.jpg",
  heroLoading: "/photos/loading.jpg",
  truckNight: "/photos/truck-night.jpg",
  truckStreet: "/photos/truck-street.jpg",
  towSign: "/photos/zone.jpg",
};

// Visuel par service (slug -> image)
export const SERVICE_IMG: Record<string, string> = {
  remorquage: "/photos/remorquage.jpg",
  "depannage-sur-place": "/photos/depannage-sur-place.jpg",
  "depannage-batterie": "/photos/depannage-batterie.jpg",
  "crevaison-pneu": "/photos/crevaison-pneu.jpg",
  "transport-vehicule": "/photos/transport-vehicule.jpg",
};

export function serviceImage(slug: string): string {
  return SERVICE_IMG[slug] ?? IMG.heroTowing;
}
