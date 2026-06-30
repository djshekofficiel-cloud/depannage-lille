// app/layout.tsx — Layout global : SEO, JSON-LD, header glass, footer premium

import type { Metadata } from "next";
import { Inter, Sora, Russo_One } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import CallButton from "@/components/CallButton";
import Logo from "@/components/Logo";
import { Header } from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";
import SplashCursor from "@/components/SplashCursor";
import StartupSound from "@/components/StartupSound";

const StarsCanvas = dynamic(
  () => import("@/components/ui/StarsCanvas").then((m) => ({ default: m.StarsCanvas })),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
});
const russo = Russo_One({ subsets: ["latin"], weight: "400", variable: "--font-russo" });

import { SITE_URL } from "@/lib/site";
import { villes } from "@/lib/villes";

// ─── Métadonnées globales ────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dépannage auto & moto Lille 24h/24 — SM Dépannage",
    template: "%s — SM Dépannage",
  },
  description:
    "Service de dépannage et remorquage auto & moto à Lille, Roubaix, Tourcoing et toute la MEL. Voitures, motos, scooters. Intervention 20–30 min. 24h/24, 7j/7.",
  keywords: [
    "dépannage auto Lille",
    "dépannage moto Lille",
    "remorquage moto Lille",
    "remorquage voiture Lille",
    "dépannage 24h Lille",
    "dépanneur Lille",
    "panne batterie Lille",
    "crevaison Lille",
    "remorquage 59",
    "dépannage 62",
    "assistance routière Nord",
    "urgence automobile",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SM Dépannage",
    title: "Dépannage auto Lille & Métropole 24h/24",
    description:
      "Dépannage et remorquage auto rapide à Lille et dans le Nord–Pas-de-Calais. Disponible 24h/24, 7j/7.",
    url: SITE_URL,
    // Vignette générée par app/opengraph-image.tsx (toujours à jour).
  },
  twitter: {
    card: "summary_large_image",
    title: "Dépannage auto Lille & Métropole 24h/24 — SM Dépannage",
    description: "Remorquage, batterie, pneu, panne moteur. Intervention 20–30 min, 24h/24 sur Lille, 59 & 62.",
  },
  icons: { icon: "/favicon.ico" },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "SM Dépannage" },
  formatDetection: { telephone: true },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

// ─── Données structurées JSON-LD ─────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "EmergencyService"],
  name: "SM Dépannage",
  image: `${SITE_URL}/og.png`,
  telephone: "07 67 87 80 34",
  priceRange: "€€",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lille",
    addressLocality: "Lille",
    postalCode: "59000",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Lille" },
    { "@type": "City", name: "Roubaix" },
    { "@type": "City", name: "Tourcoing" },
    { "@type": "City", name: "Villeneuve-d'Ascq" },
    { "@type": "City", name: "Lens" },
    { "@type": "City", name: "Béthune" },
    { "@type": "City", name: "Arras" },
    { "@type": "AdministrativeArea", name: "Nord" },
    { "@type": "AdministrativeArea", name: "Pas-de-Calais" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  geo: { "@type": "GeoCoordinates", latitude: 50.6292, longitude: 3.0573 },
};

const PHONE = "07 67 87 80 34";
const PHONE_LABEL = "07 67 87 80 34";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable} ${russo.variable} bg-ink-950`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SM Dépannage" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="256x256" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans text-white antialiased">
        <SplashCursor SIM_RESOLUTION={128} DYE_RESOLUTION={1440} DENSITY_DISSIPATION={3.5} VELOCITY_DISSIPATION={2} PRESSURE={0.1} CURL={3} SPLAT_RADIUS={0.2} SPLAT_FORCE={6000} COLOR_UPDATE_SPEED={10} />
        <StartupSound src="/panne.mp3" volume={0.5} />
        <StarsCanvas />
        <Header />

        {/* ── BANDEAU URGENCE (lisible, non-marquee) ─────────────────── */}
        <div className="border-b border-white/10 bg-ink-900/85">
          <div className="container-x py-2.5 text-xs sm:text-sm text-white/75 flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="text-sm-red-300 font-semibold">Disponible 24h/24 · 7j/7</span>
            <span>Intervention 20 à 30 min sur Lille</span>
            <span>Tarif annoncé avant intervention</span>
          </div>
        </div>

        <main>{children}</main>

        {/* ── FOOTER ─────────────────────────────────────────────────── */}
        <footer className="relative mt-24 border-t border-white/10 bg-ink-900/60">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sm-red-500/60 to-transparent" />
          <div className="container-x py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
              <div>
                <Link href="/" aria-label="SM Dépannage — accueil" className="inline-block mb-4">
                  <Logo markClassName="h-9 w-9" />
                </Link>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                  Dépannage et remorquage auto nouvelle génération à Lille, dans le 59 et le 62. Disponible 24h/24, 7j/7.
                </p>
                <a href={`tel:${PHONE}`} className="mt-5 inline-flex items-center gap-2 text-gradient font-display font-bold text-xl">
                  {PHONE_LABEL}
                </a>
              </div>

              <div>
                <h4 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-[0.2em]">Services</h4>
                <ul className="space-y-2.5 text-sm text-white/55">
                  {[
                    ["Remorquage", "/services/remorquage"],
                    ["Dépannage sur place", "/services/depannage-sur-place"],
                    ["Batterie à plat", "/services/depannage-batterie"],
                    ["Crevaison / Pneu", "/services/crevaison-pneu"],
                    ["Transport de véhicule", "/services/transport-vehicule"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="hover:text-sm-red-300 transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-[0.2em]">Informations</h4>
                <ul className="space-y-2.5 text-sm text-white/55">
                  {[
                    ["À propos", "/a-propos"],
                    ["Tarifs", "/tarifs"],
                    ["Contact", "/contact"],
                    ["Mentions légales", "/mentions-legales"],
                    ["Politique de confidentialité", "/politique-confidentialite"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="hover:text-sm-red-300 transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white/90 font-semibold mb-4 text-xs uppercase tracking-[0.2em]">Zones d&apos;intervention</h4>
                <ul className="space-y-2.5 text-sm text-white/55">
                  {villes.slice(0, 8).map((v) => (
                    <li key={v.slug}>
                      <Link href={`/zones-intervention/${v.slug}`} className="hover:text-sm-red-300 transition-colors">
                        Dépannage {v.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40">
              © {new Date().getFullYear()} SM Dépannage — Tous droits réservés — Région Nord–Pas-de-Calais
            </div>
          </div>
        </footer>

        <div className="md:hidden h-16" aria-hidden />
        <CallButton />
        <ChatWidget />
      </body>
    </html>
  );
}
