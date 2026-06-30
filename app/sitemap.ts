import { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { villes } from '@/lib/villes';
import { SITE_URL } from '@/lib/site';
import { indexableCombos } from '@/lib/seo/quality';

const CITY_PRIORITY: Record<string, number> = {
  lille: 0.9,
  lens: 0.9,
  roubaix: 0.85,
  tourcoing: 0.85,
  lievin: 0.85,
  bethune: 0.85,
  arras: 0.85,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const mainPages = [
    { url: SITE_URL, priority: 1.0 },
    { url: `${SITE_URL}/contact`, priority: 0.9 },
    { url: `${SITE_URL}/services`, priority: 0.8 },
    { url: `${SITE_URL}/zones-intervention`, priority: 0.8 },
    { url: `${SITE_URL}/tarifs`, priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, priority: 0.7 },
    { url: `${SITE_URL}/mentions-legales`, priority: 0.3 },
    { url: `${SITE_URL}/politique-confidentialite`, priority: 0.3 },
  ];

  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    priority: 0.7,
  }));

  const cityPages = villes.map((ville) => ({
    url: `${SITE_URL}/zones-intervention/${ville.slug}`,
    priority: CITY_PRIORITY[ville.slug] ?? 0.8,
  }));

  // Pages combinées service × ville : UNIQUEMENT les combinaisons validées par le
  // garde anti-pages-satellites (aucune tant qu'aucune ville n'a de contenu local réel).
  const comboPages = indexableCombos(services, villes).map(({ service, city }) => ({
    url: `${SITE_URL}/depannage/${service.slug}/${city.slug}`,
    priority: 0.6,
  }));

  return [...mainPages, ...servicePages, ...cityPages, ...comboPages].map((page) => ({
    ...page,
    lastModified: now,
    changeFrequency: 'weekly' as const,
  }));
}
