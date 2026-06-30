# 🚗 SM Dépannage — Site vitrine dépannage auto Lille

Site vitrine moderne et performant pour **SM Dépannage** — service de dépannage et remorquage automobile 24/7 couvrant Lille, la Métropole Européenne de Lille (MEL) et les départements 59 (Nord) et 62 (Pas-de-Calais).

**Déploiement actif :** https://sm-depannage59.fr (Vercel)  
**Téléphone :** +33 7 67 87 80 34  
**Service géographique :** Rayon 59/62 (Lille, Roubaix, Tourcoing, Douai, Lens, Arras, etc.)

## 📋 Stack technique

- **Framework** : Next.js 14 (App Router)
- **Style** : Tailwind CSS + animations personnalisées
- **Langage** : TypeScript
- **Design** : Néon rouge (#dc2626 / #ef4444) + effets halos/anneaux SVG
- **Déploiement** : Vercel (serverless functions)
- **IA/Chatbot** : Mistral AI (mistral-small-latest) avec tool CRM
- **Domaine** : OVH (sm-depannage59.fr)
- **Analytics** : Vercel Web Analytics

## 🎨 Identité visuelle

- **Logo** : SM Dépannage (PNG détouré, transparent) — `/public/logo-sm-depannage-opt.png`
- **Palette** : Néon rouge + accents bleus sur fond noir
- **Typographie** : Système Tailwind par défaut (Geist)
- **Effets** : Text-shadow lumineux, halos SVG, anneaux tournants (Hero)
- **Responsive** : Mobile first, 100% adapté iPhone/Android/tablet/desktop

## 🤖 Chatbot IA (Mistral)

**Widget flottant rouge** intégré sur toutes les pages — assistance IA 24/7.

- **Moteur** : Mistral AI (`mistral-small-latest`, temp. 0.3)
- **Route serveur** : `/api/chat` (Next.js App Router)
- **Tool CRM** : Création d'interventions automatisée (`creer_intervention`)
- **Contexte** : 
  - FAQ dépannage complet (voitures, motos, scooters, camionnettes)
  - Zones de service (villes 59/62)
  - Créneaux disponibles (horaires 24/7)
  - Périmètre géographique verrouillé
- **Sécurité** : Clé API Mistral en `.env.local` (jamais commitée)
- **Mode démo** : Sur GitHub Pages (réponses scriptées, pas de backend)

**Fichiers clés :**
- `components/ChatWidget.tsx` — Widget flottant
- `app/api/chat/route.ts` — Backend Mistral
- `lib/systemPrompt.ts` — Prompt système + FAQ
- `lib/villes.ts` — Liste des villes et créneaux

## 🚀 Commandes

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (http://localhost:3001 ou 3000)
npm run dev

# Build de production
npm run build

# Démarrer en production (après build)
npm run start

# Vérifier le linting
npm run lint

# Déployer sur Vercel (depuis la branche master)
vercel --prod --yes
```

## ⚙️ Configuration avant déploiement

### 1. Variables d'environnement

Copier `.env.local.example` en `.env.local` et remplir les valeurs :

```bash
cp .env.local.example .env.local
```

| Variable | Description | Obligatoire | Exemple |
|----------|-------------|-------------|---------|
| `MISTRAL_API_KEY` | Clé API Mistral pour le chatbot IA | Oui (prod) | sk-xxxxx |
| `NEXT_PUBLIC_SITE_URL` | URL du site en production | Oui | https://sm-depannage59.fr |
| `NEXT_PUBLIC_PHONE` | Numéro de téléphone affiché | Oui | +33 7 67 87 80 34 |

**⚠️ Important :** Ne jamais commiter `.env.local` (secrets API)

### 2. Personnaliser le contenu

Avant la mise en ligne, remplacer les valeurs génériques dans le code :

- `+33XXXXXXXXX` → numéro de téléphone réel du client
- `votredomaine.fr` → domaine acheté
- `NordDépannage` → raison sociale du client
- `contact@votredomaine.fr` → email professionnel
- Mentions légales (`app/mentions-legales/page.tsx`) → SIRET, adresse, forme juridique
- À propos (`app/a-propos/page.tsx`) → texte personnalisé

### 3. Données des villes

Modifier `lib/villes.ts` pour ajuster :
- Les délais d'intervention selon la zone réelle
- Les axes routiers couverts
- Ajouter/supprimer des villes

## 🌐 Déploiement actuel

**Status :** ✅ En ligne sur Vercel  
**URL Vercel** : https://depannage-lille-w982.vercel.app  
**URL domaine** : https://sm-depannage59.fr  
**Repo GitHub** : `djshekofficiel-cloud/depannage-lille` (branche `master`)

### Configuration DNS (OVH → Vercel)

Pour pointer `sm-depannage59.fr` vers Vercel :

| Type | Sous-domaine | Valeur |
|------|------------|--------|
| CNAME | www | cname.vercel-dns.com |
| A | @ | 76.76.19.165 |

**⏱️ Propagation DNS :** 15-30 minutes après ajout chez OVH

### Déploiement Vercel

```bash
# Pousser la branche master → redéploiement automatique
git push origin master

# Ou forcer un redéploiement depuis la CLI Vercel
vercel --prod --yes
```

**Environment Variables sur Vercel** (Settings → Environment Variables) :
- `MISTRAL_API_KEY` (Production, Preview, Development)
- `NEXT_PUBLIC_SITE_URL` (tous)
- `NEXT_PUBLIC_PHONE` (tous)

## ✨ Features principales

- ✅ **Hero néon rouge** avec logo animé, halos, anneaux tournants
- ✅ **Chatbot IA 24/7** (Mistral) — widget flottant sur chaque page
- ✅ **5 services détaillés** (remorquage, dépannage sur place, batterie, crevaison, transport)
- ✅ **16+ zones de service** (villes 59 & 62) avec créneaux spécifiques
- ✅ **Grille tarifaire** transparente
- ✅ **Formulaire de contact** (protégé honeypot + sanitization)
- ✅ **Google Maps intégré** (géolocalisation rapide)
- ✅ **Mobile-first responsif** (iPhone/Android/tablet/desktop)
- ✅ **SEO local optimisé** (JSON-LD EmergencyService, méta uniques par ville)
- ✅ **Lighthouse A+** (performance, accessibility, best practices, SEO)
- ✅ **Mentions légales & politique confidentialité** (conformité RGPD)

## 📂 Structure des pages

```
/                                    Accueil (Hero + CTA chatbot)
/services                            Tous les services
  /services/remorquage               Remorquage 24/7
  /services/depannage-sur-place      Dépannage mécanique sur place
  /services/depannage-batterie       Batterie/démarrage
  /services/crevaison-pneu           Crevaison/remplacement pneu
  /services/transport-vehicule       Transport de véhicule
/zones-intervention                  Zones de service (index)
  /zones-intervention/lille          Lille (code 59, créneaux réels)
  /zones-intervention/roubaix        Roubaix
  /zones-intervention/tourcoing      Tourcoing
  /zones-intervention/[13 villes+]   Autres villes 59/62
/tarifs                              Grille tarifaire officielle
/a-propos                            Présentation SM Dépannage
/contact                             Formulaire + téléphone direct
/mentions-legales                    SIRET, adresse, contact
/politique-confidentialite           RGPD, traitement données
```

## 📁 Arborescence du projet

```
depannage-lille/
├── app/                            Next.js App Router
│   ├── api/
│   │   └── chat/route.ts          Backend chatbot Mistral
│   ├── (pages)/
│   │   ├── page.tsx               Accueil
│   │   ├── services/
│   │   ├── zones-intervention/
│   │   ├── tarifs/page.tsx
│   │   ├── a-propos/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx                 Layout global
│   └── globals.css                Styles globaux (Tailwind + custom)
├── components/
│   ├── HeroNeon.tsx              Hero avec animation néon
│   ├── ChatWidget.tsx            Widget chatbot flottant
│   ├── Navigation.tsx            Header/nav
│   └── [autres composants...]
├── lib/
│   ├── systemPrompt.ts           Prompt système Mistral (FAQ, périmètre)
│   ├── villes.ts                 Liste villes, créneaux, axes routiers
│   ├── crm.ts                    Mock CRM pour outil `creer_intervention`
│   └── [utils...]
├── public/
│   ├── logo-sm-depannage-opt.png Logo officiel (transparent)
│   ├── og-image.jpg              Image OpenGraph (WhatsApp, réseaux)
│   └── [autres assets...]
├── docs/
│   └── index.html                Aperçu static GitHub Pages
├── .vercel/                      Config Vercel (auto-généré)
├── .env.local.example            Template variables d'env
├── .env.local                    Secrets (⚠️ .gitignore)
├── next.config.js                Config Next.js (CSP, headers sécu)
├── tsconfig.json                 Config TypeScript
├── tailwind.config.ts            Config Tailwind
└── README.md                      Ce fichier
```

## 📋 Actions post-mise en ligne

| Action | Responsable | Priorité |
|--------|-------------|----------|
| ✅ Acheter domaine sm-depannage59.fr (OVH) | ✓ Fait | Critique |
| ✅ Configurer DNS vers Vercel | ✓ Fait | Critique |
| ✅ Déployer sur Vercel | ✓ Fait | Critique |
| 📌 Créer fiche Google Business Profile (SMD) | Client + Dev | Haute |
| 📌 Ajouter horaires 24/7 + photos sur GBP | Client | Haute |
| 📌 Ajouter site à Google Search Console | Dev | Haute |
| 📌 Soumettre sitemap GSC | Dev | Haute |
| 📌 Ajouter à Bing Webmaster Tools | Dev | Moyenne |
| 📌 Ajouter sur annuaires locaux (Yelp, Pages Jaunes, etc.) | Client | Moyenne |
| 📌 Récolter premiers avis clients | Client | En continu |

## 🔧 Maintenance & Support

**Infrastructure :**
- **Hébergement** : Vercel (serverless, auto-scaling)
- **Certificat SSL** : Let's Encrypt (automatique Vercel)
- **CDN** : Vercel Edge Network
- **Uptime** : 99.9% SLA Vercel

**Monitoring :**
- Vercel Web Analytics (dashboard intégré)
- Speed Insights (Core Web Vitals)
- Vercel Logs (API routes, serverless functions)
- Status page : https://vercel-status.com

**Coûts mensuels estimés :**
- Vercel (Pro plan) : ~20€/mois
- Domaine OVH : ~10€/an
- Mistral AI : Pay-as-you-go (chatbot) ~5-15€/mois selon usage
- **Total** : ~30-50€/mois (variable selon traffic)

## 🔍 SEO local (local SEO)

**Stratégie :** Dominer les recherches "dépannage auto [ville]", "remorquage [commune]", etc.

Chaque page ville (`/zones-intervention/[ville]`) contient :

- ✅ `<title>` unique : *"Dépannage auto [Ville] 59/62 — 24/7 rapide"*
- ✅ `<meta description>` unique avec CTA téléphone
- ✅ Un seul `<h1>` : *"[Ville] — Dépannage auto 24/7"*
- ✅ Contenu unique (histoire locale, délai réel, axes routiers)
- ✅ Balise `<link rel="canonical">` auto
- ✅ JSON-LD `EmergencyService` spécifique à la ville
- ✅ Balises `<meta og:*>` (OpenGraph pour réseaux sociaux)

**Pages génératrices de traffic :**
- `/zones-intervention/lille` — Recherche "dépannage Lille", volume +++ 
- `/zones-intervention/roubaix`, `/douai`, `/lens` — Autres villes hautes
- `/services/remorquage` — Recherche "remorquage 59"

**Prochaines étapes SEO :**
1. Google Search Console → Soumettre sitemap, monitorer indexation
2. Google Business Profile → Fiche complète + photos + avis
3. Backlinks locaux (annuaires auto, forums auto du Nord)

## 🔐 Sécurité

**En-têtes HTTP** (configurés `next.config.js`) :
- `Content-Security-Policy` (CSP) — bloque injections XSS
- `X-Frame-Options: SAMEORIGIN` — empêche clickjacking
- `Strict-Transport-Security` (HSTS) — force HTTPS
- `X-Content-Type-Options: nosniff` — empêche sniffing MIME
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — désactive features inutiles

📊 **Vérifier sur** [securityheaders.com](https://securityheaders.com/?q=sm-depannage59.fr) après déploiement

**Formulaire de contact** protégé par :
- ✅ Champ honeypot caché (anti-bot automatique)
- ✅ Validation côté serveur (type, longueur, format tel)
- ✅ Sanitization HTML (DOMPurify)
- ✅ Rate limiting (optionnel sur Vercel)

**Variables sensibles :**
- `.env.local` jamais commité (`.gitignore` configuré)
- Secrets Vercel via Settings → Environment Variables
- Clés API Mistral jamais exposées en client-side

## 📞 Infos pratiques

**Téléphone principal :** +33 7 67 87 80 34  
**Domaine :** sm-depannage59.fr  
**Zones couverte :** Lille, Métropole MEL, Nord (59), Pas-de-Calais (62)  
**Délais** : 15-30 min Lille, 20-45 min zones périphériques

## 👨‍💻 Développement & Support

**Créé par :** [Équipe DJ Shek](https://github.com/djshekofficiel-cloud)  
**Stack** : Next.js 14 + TypeScript + Tailwind + Mistral AI  
**Repo** : https://github.com/djshekofficiel-cloud/depannage-lille  
**Branche principale** : `master` (auto-deployée sur Vercel)

Pour des questions ou améliorations, contactez l'équipe de développement via GitHub Issues.

---

**Dernier update :** 30 juin 2026  
**Version** : 1.0.0 (Production Vercel)
