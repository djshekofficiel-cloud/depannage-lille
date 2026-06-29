// app/robots.ts — Fichier robots.txt dynamique

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Exclure les pages légales et l'API des robots
        disallow: ["/api/", "/mentions-legales", "/politique-confidentialite"],
      },
    ],
    sitemap: "https://votredomaine.fr/sitemap.xml",
    host: "https://votredomaine.fr",
  };
}
