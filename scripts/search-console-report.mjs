#!/usr/bin/env node
// scripts/search-console-report.mjs
// Rapport Google Search Console (serveur uniquement — JAMAIS exposé côté navigateur).
//
// Variables d'environnement requises (voir .env.example) :
//   GSC_SITE_URL        ex. sc-domain:sm-depannage59.fr  ou  https://www.sm-depannage59.fr/
//   GOOGLE_CLIENT_EMAIL compte de service avec accès lecture à la propriété GSC
//   GOOGLE_PRIVATE_KEY  clé privée du compte de service (\n échappés acceptés)
//
// Usage : node scripts/search-console-report.mjs --days=28 --limit=50

import { google } from "googleapis";

function arg(name, def) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : def;
}

const days = Math.max(1, parseInt(arg("days", "28"), 10) || 28);
const limit = Math.max(1, parseInt(arg("limit", "50"), 10) || 50);

const { GSC_SITE_URL, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;

if (!GSC_SITE_URL || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error(
    "\n⚠️  Variables manquantes. Renseignez GSC_SITE_URL, GOOGLE_CLIENT_EMAIL et GOOGLE_PRIVATE_KEY\n" +
      "   (voir .env.example). Aucune clé n'est affichée. Arrêt propre.\n"
  );
  process.exit(0);
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function main() {
  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const webmasters = google.webmasters({ version: "v3", auth });

  const startDate = isoDaysAgo(days);
  const endDate = isoDaysAgo(1);

  async function query(dimensions) {
    const res = await webmasters.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { startDate, endDate, dimensions, rowLimit: limit },
    });
    return res.data.rows ?? [];
  }

  const fmt = (r) =>
    `clics ${String(r.clicks).padStart(5)} · impr ${String(r.impressions).padStart(6)} · ` +
    `CTR ${(r.ctr * 100).toFixed(1).padStart(5)}% · pos ${r.position.toFixed(1).padStart(5)}`;

  console.log(`\n📊 Search Console — ${GSC_SITE_URL}`);
  console.log(`Période : ${startDate} → ${endDate} (${days} j)\n`);

  const queries = await query(["query"]);
  console.log(`── Top requêtes (${queries.length}) ──`);
  for (const r of queries) console.log(`  ${fmt(r)}  ${r.keys[0]}`);

  const pages = await query(["page"]);
  console.log(`\n── Top pages (${pages.length}) ──`);
  for (const r of pages) console.log(`  ${fmt(r)}  ${r.keys[0]}`);

  console.log("");
}

main().catch((e) => {
  console.error("\n❌ Erreur Search Console :", e.message, "\n");
  process.exit(1);
});
