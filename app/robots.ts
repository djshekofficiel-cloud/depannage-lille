import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/.next'],
    },
    sitemap: 'https://depannage-lille.vercel.app/sitemap.xml',
    host: 'https://depannage-lille.vercel.app',
  };
}
