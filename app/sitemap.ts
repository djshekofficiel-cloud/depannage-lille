// app/sitemap.ts — Sitemap dynamique incluant toutes les pages villes et services

import { MetadataRoute } from "next";
import { villes } from "@/lib/villes";
import { services } from "@/lib/services";

const BASE_URL = "https://votredomaine.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Pages statiques principales ──────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tarifs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/zones-intervention`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // ── Pages services dynamiques ─────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // ── Pages villes dynamiques ───────────────────────────────────────────────
  const villePages: MetadataRoute.Sitemap = villes.map((v) => ({
    url: `${BASE_URL}/zones-intervention/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...villePages];
}
