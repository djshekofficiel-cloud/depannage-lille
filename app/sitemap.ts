import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://depannage-lille.vercel.app';
  const now = new Date();

  const mainPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/contact`, priority: 0.9 },
    { url: `${baseUrl}/services`, priority: 0.8 },
    { url: `${baseUrl}/zones-intervention`, priority: 0.8 },
    { url: `${baseUrl}/mentions-legales`, priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, priority: 0.3 },
  ];

  const servicePages = [
    'depannage-sur-place',
    'remorquage',
    'batterie',
    'crevaison',
    'rapatriement',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    priority: 0.7,
  }));

  const cityPages = [
    { slug: 'lille', priority: 0.9 },
    { slug: 'roubaix', priority: 0.85 },
    { slug: 'tourcoing', priority: 0.85 },
    { slug: 'villeneuve-d-ascq', priority: 0.8 },
    { slug: 'wattrelos', priority: 0.8 },
    { slug: 'marcq-en-baroeul', priority: 0.8 },
    { slug: 'lambersart', priority: 0.8 },
    { slug: 'la-madeleine', priority: 0.8 },
    { slug: 'croix', priority: 0.8 },
    { slug: 'wasquehal', priority: 0.8 },
    { slug: 'mons-en-baroeul', priority: 0.8 },
    { slug: 'armentieres', priority: 0.8 },
    { slug: 'halluin', priority: 0.8 },
    { slug: 'lens', priority: 0.9 },
    { slug: 'lievin', priority: 0.85 },
    { slug: 'bethune', priority: 0.85 },
    { slug: 'arras', priority: 0.85 },
    { slug: 'henin-beaumont', priority: 0.8 },
    { slug: 'bruay-la-buissiere', priority: 0.8 },
    { slug: 'carvin', priority: 0.8 },
  ].map((city) => ({
    url: `${baseUrl}/zones-intervention/${city.slug}`,
    priority: city.priority,
  }));

  return [
    ...mainPages,
    ...servicePages,
    ...cityPages,
  ].map((page) => ({
    ...page,
    lastModified: now,
    changeFrequency: 'weekly' as const,
  }));
}
