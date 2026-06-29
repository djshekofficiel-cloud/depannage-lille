// next.config.js — Configuration Next.js avec en-têtes de sécurité HTTP

/** @type {import('next').NextConfig} */

// ─── En-têtes de sécurité HTTP ───────────────────────────────────────────────
const securityHeaders = [
  // Empêche le clickjacking — le site ne peut être intégré dans une iframe tierce
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Empêche le MIME sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Contrôle les informations de référent envoyées lors des liens sortants
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restreint l'accès aux API sensibles du navigateur
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
  // Force HTTPS pendant 2 ans, inclut les sous-domaines, soumet au preload HSTS
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy — adapté pour Next.js + Google Maps
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts : Next.js inline + Google Maps
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.googletagmanager.com",
      // Images : sources connues + data URIs
      "img-src 'self' data: https: blob:",
      // Styles : Next.js utilise des styles inline
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Polices de caractère
      "font-src 'self' https://fonts.gstatic.com",
      // Iframes : Google Maps
      "frame-src https://www.google.com https://maps.google.com",
      // Connexions réseau : Resend API + Google APIs
      "connect-src 'self' https://api.resend.com https://maps.googleapis.com https://plausible.io",
    ].join("; "),
  },
  // Protection XSS supplémentaire pour les anciens navigateurs
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig = {
  // ── En-têtes HTTP ──────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Applique les en-têtes de sécurité sur toutes les routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // ── Optimisation des images ────────────────────────────────────────────────
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 jours
  },

  // ── Compression ───────────────────────────────────────────────────────────
  compress: true,

  // ── Variables publiques (non sensibles) ───────────────────────────────────
  // Les secrets (RESEND_API_KEY, etc.) restent dans .env.local côté serveur
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://votredomaine.fr",
    NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE || "+33XXXXXXXXX",
  },
};

module.exports = nextConfig;
