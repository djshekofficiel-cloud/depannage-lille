// app/layout.tsx — Layout global : SEO, JSON-LD, header glass, footer premium

import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import CallButton from "@/components/CallButton";
import Logo from "@/components/Logo";

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

// ─── Métadonnées globales ────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://votredomaine.fr"),
  title: {
    default: "Dépannage auto Lille & Métropole 24h/24 — SM Dépannage",
    template: "%s — SM Dépannage",
  },
  description:
    "Service de dépannage et remorquage auto à Lille, Roubaix, Tourcoing et toute la MEL. Intervention 24h/24, 7j/7. Appelez maintenant !",
  keywords: [
    "dépannage auto Lille",
    "remorquage voiture Lille",
    "dépannage 24h Lille",
    "dépanneur Lille",
    "panne batterie Lille",
    "remorquage 59",
    "dépannage 62",
  ],
  alternates: { canonical: "https://votredomaine.fr" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SM Dépannage",
    title: "Dépannage auto Lille & Métropole 24h/24",
    description:
      "Dépannage et remorquage auto rapide à Lille et dans le Nord–Pas-de-Calais. Disponible 24h/24, 7j/7.",
    url: "https://votredomaine.fr",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SM Dépannage — dépannage auto Lille 24h/24" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dépannage auto Lille & Métropole 24h/24 — SM Dépannage",
    description: "Remorquage, batterie, pneu, panne moteur. Intervention 20–30 min, 24h/24 sur Lille, 59 & 62.",
    images: ["/og.png"],
  },
};

// ─── Données structurées JSON-LD ─────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "EmergencyService"],
  name: "SM Dépannage",
  image: "https://votredomaine.fr/logo.jpg",
  telephone: "07 67 87 80 34",
  priceRange: "€€",
  url: "https://votredomaine.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zone d'intervention",
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

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/zones-intervention", label: "Zones" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const PHONE = "07 67 87 80 34";
const PHONE_LABEL = "+33 X XX XX XX XX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable} bg-ink-950`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans text-white antialiased">
        <StarsCanvas />
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
          <div className="container-x">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" aria-label="SM Dépannage — accueil" className="transition-transform hover:scale-[1.03]">
                <Logo markClassName="h-9 w-9" />
              </Link>

              {/* Nav desktop */}
              <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-sm font-medium text-white/70 hover:text-white transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-sm-red-500 hover:after:w-full after:transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA téléphone desktop */}
              <a href={`tel:${PHONE}`} className="hidden md:inline-flex btn-primary !px-5 !py-2.5 text-sm" aria-label="Appeler SM Dépannage">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {PHONE_LABEL}
              </a>
            </div>
          </div>
        </header>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40">
              © {new Date().getFullYear()} SM Dépannage — Tous droits réservés — Région Nord–Pas-de-Calais
            </div>
          </div>
        </footer>

        <div className="md:hidden h-16" aria-hidden />
        <CallButton />
      </body>
    </html>
  );
}
