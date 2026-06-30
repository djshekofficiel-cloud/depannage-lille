#!/usr/bin/env node
// scripts/unlighthouse.mjs
// Lance Unlighthouse sur l'URL définie par NEXT_PUBLIC_SITE_URL (cross-platform).
// Refuse de lancer un audit sur un domaine encore en placeholder.

import { spawnSync } from "node:child_process";

const site = process.env.NEXT_PUBLIC_SITE_URL;

if (!site || /example\.fr|localhost/i.test(site)) {
  console.error(
    "\n⚠️  NEXT_PUBLIC_SITE_URL absent ou non valide (placeholder/localhost).\n" +
      "   Définissez une URL de production avant de lancer l'audit, ex. :\n" +
      "   NEXT_PUBLIC_SITE_URL=https://www.sm-depannage59.fr npm run seo:audit\n"
  );
  process.exit(0);
}

console.log(`\n🔦 Unlighthouse → ${site}\n`);
const res = spawnSync("npx", ["unlighthouse", "--site", site], { stdio: "inherit", shell: process.platform === "win32" });
process.exit(res.status ?? 0);
