// app/opengraph-image.tsx — Vignette de partage (Open Graph) générée par code.
// S'affiche quand on colle le lien sur WhatsApp, Facebook, SMS, LinkedIn, etc.

import { ImageResponse } from "next/og";

export const alt = "SM Dépannage — dépannage auto & moto à Lille 24h/24";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 78% 22%, #3a0d0d 0%, #0a0a12 58%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Badge disponibilité */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            color: "#fca5a5",
            letterSpacing: 3,
            fontWeight: 700,
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: 99, background: "#22c55e" }} />
          DISPONIBLE 24H/24 · 7J/7
        </div>

        {/* Titre */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            Dépannage auto &amp; moto
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: "#ef4444" }}>
            Lille &amp; Métropole
          </div>
          <div style={{ fontSize: 33, color: "#cbd5e1", marginTop: 26 }}>
            Remorquage · Batterie · Pneu · Panne — intervention 20 à 30 min
          </div>
        </div>

        {/* Bas : marque + téléphone */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 42, fontWeight: 800 }}>
              <span style={{ color: "#ef4444" }}>SM</span>
              <span style={{ marginLeft: 12 }}>Dépannage</span>
            </div>
            <div style={{ fontSize: 27, color: "#94a3b8", marginTop: 6 }}>
              Nord (59) · Pas-de-Calais (62)
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "linear-gradient(135deg,#dc2626,#b91c1c)",
              color: "white",
              fontSize: 46,
              fontWeight: 800,
              padding: "20px 38px",
              borderRadius: 18,
            }}
          >
            07 67 87 80 34
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
