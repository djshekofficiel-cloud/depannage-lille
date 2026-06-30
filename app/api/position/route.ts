// app/api/position/route.ts — reçoit la géoloc du visiteur et déduit la ville couverte la plus proche
// (calcul local via lib/villes.ts : aucune API tierce, aucune clé).

import { villes } from '@/lib/villes';

export const runtime = 'nodejs';

// Distance à vol d'oiseau (km) entre deux points GPS — formule de haversine.
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function POST(req: Request) {
  let body: { latitude?: number; longitude?: number };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { latitude, longitude } = body;
  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    Number.isNaN(latitude) ||
    Number.isNaN(longitude)
  ) {
    return Response.json({ error: 'Coordonnées manquantes ou invalides.' }, { status: 400 });
  }

  // Ville couverte la plus proche.
  let nearest = villes[0];
  let best = Infinity;
  for (const v of villes) {
    const d = distanceKm(latitude, longitude, v.lat, v.lng);
    if (d < best) {
      best = d;
      nearest = v;
    }
  }

  // Au-delà de ~60 km de toute ville couverte, on considère le visiteur hors zone 59/62.
  const dansZone = best <= 60;

  return Response.json({
    ville: nearest.nom,
    cp: nearest.cp,
    dept: nearest.dept,
    delai: nearest.delai,
    distanceKm: Math.round(best),
    dansZone,
  });
}
