#!/usr/bin/env node
// scripts/check-seo.mjs
// Contrôle SEO statique — sans dépendance, sans runtime TypeScript.
// Analyse les fichiers de données (lib/services.ts, lib/villes.ts, lib/site.ts)
// pour détecter doublons, placeholders et configurations manquantes.
//
// Code de sortie : 1 uniquement si un problème CRITIQUE est trouvé.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const errors = [];
const warnings = [];
const crit = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// Extrait les valeurs d'une clé `cle: "..."` ou `cle: '...'` dans un texte TS.
function extractField(src, key) {
  const re = new RegExp(`${key}\\s*:\\s*(["'\`])((?:\\\\.|(?!\\1).)*)\\1`, "g");
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push(m[2].trim());
  return out;
}

function findDuplicates(values, label) {
  const seen = new Map();
  for (const v of values) {
    const k = v.toLowerCase();
    seen.set(k, (seen.get(k) ?? 0) + 1);
  }
  for (const [v, n] of seen) if (n > 1) crit(`${label} en double (${n}×) : "${v}"`);
}

const PLACEHOLDER = /TODO|example\.fr|xxxxx|\+33XXXX|à compléter|lorem ipsum/i;

// ── Services ──────────────────────────────────────────────────────────────────
const servicesSrc = read("lib/services.ts");
findDuplicates(extractField(servicesSrc, "slug"), "Slug service");
findDuplicates(extractField(servicesSrc, "titre"), "Titre service");
findDuplicates(extractField(servicesSrc, "description"), "Description service");

// ── Villes ────────────────────────────────────────────────────────────────────
const villesSrc = read("lib/villes.ts");
findDuplicates(extractField(villesSrc, "slug"), "Slug ville");
const villeDesc = extractField(villesSrc, "description");
findDuplicates(villeDesc, "Description ville");

// ── Site / config ────────────────────────────────────────────────────────────
const siteSrc = read("lib/site.ts");
if (/example\.fr/i.test(siteSrc)) crit("Domaine encore défini sur example.fr dans lib/site.ts.");
if (/\+33XXXX|XX XX XX XX XX/.test(siteSrc)) crit("Numéro de téléphone non configuré dans lib/site.ts.");

// ── Placeholders dans le contenu visible ──────────────────────────────────────
for (const [file, src] of [["lib/services.ts", servicesSrc], ["lib/villes.ts", villesSrc]]) {
  if (PLACEHOLDER.test(src)) warn(`Placeholder détecté dans ${file} (vérifier qu'il n'est pas indexé).`);
}

// ── Cohérence indexable villes ────────────────────────────────────────────────
// Une ville marquée indexable: true doit posséder du contenu local distinctif.
const blocks = villesSrc.split(/\{\s*slug:/).slice(1);
for (const b of blocks) {
  const slug = (b.match(/^\s*["'`]([^"'`]+)/) || [])[1];
  if (/indexable\s*:\s*true/.test(b)) {
    if (!/introductionLocale\s*:/.test(b)) crit(`Ville "${slug}" indexable mais sans introductionLocale.`);
    if (!/preuvesLocales\s*:/.test(b)) crit(`Ville "${slug}" indexable mais sans preuvesLocales.`);
    if (!/quartiers\s*:/.test(b)) crit(`Ville "${slug}" indexable mais sans quartiers.`);
  }
}

// ── Rapport ───────────────────────────────────────────────────────────────────
console.log("\n🔎 Contrôle SEO\n" + "─".repeat(40));
console.log(`Services analysés : ${extractField(servicesSrc, "slug").length}`);
console.log(`Villes analysées  : ${extractField(villesSrc, "slug").length}`);

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} avertissement(s) :`);
  for (const w of warnings) console.log("   • " + w);
}
if (errors.length) {
  console.log(`\n❌ ${errors.length} problème(s) critique(s) :`);
  for (const e of errors) console.log("   • " + e);
  console.log("");
  process.exit(1);
}
console.log("\n✅ Aucun problème critique détecté.\n");
