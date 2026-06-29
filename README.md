# NordDépannage — Site vitrine dépannage auto Lille

Site Next.js 14 optimisé SEO local pour un service de dépannage et remorquage auto
couvrant Lille, la Métropole Européenne de Lille (MEL) et les départements 59 (Nord)
et 62 (Pas-de-Calais).

## Stack technique

- **Framework** : Next.js 14 (App Router)
- **Style** : Tailwind CSS
- **Langage** : TypeScript
- **Déploiement** : Vercel
- **Emails** : Resend (formulaire de contact)
- **Analytics** : Plausible (sans cookie)

## Commandes

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (http://localhost:3000)
npm run dev

# Build de production
npm run build

# Démarrer en production (après build)
npm run start

# Vérifier le linting
npm run lint
```

## Configuration avant déploiement

### 1. Variables d'environnement

Copier `.env.local.example` en `.env.local` et remplir les valeurs :

```bash
cp .env.local.example .env.local
```

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails | Oui (prod) |
| `CONTACT_EMAIL` | Email qui reçoit les demandes d'intervention | Oui (prod) |
| `NEXT_PUBLIC_SITE_URL` | URL du site en production | Oui |
| `NEXT_PUBLIC_PHONE` | Numéro de téléphone affiché | Oui |

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

## Déploiement sur Vercel

```bash
# 1. Initialiser git
git init && git add . && git commit -m "init: site dépannage auto Lille"

# 2. Pousser sur GitHub
git remote add origin https://github.com/votre-username/depannage-lille.git
git push -u origin main
```

Puis sur [vercel.com](https://vercel.com) :
1. **Import** du repo GitHub
2. **Environment Variables** → ajouter les variables de `.env.local.example`
3. **Deploy** → HTTPS automatique

## Structure des pages

```
/                           Accueil
/services                   Liste des services
/services/remorquage        Remorquage
/services/depannage-sur-place
/services/depannage-batterie
/services/crevaison-pneu
/services/transport-vehicule
/zones-intervention         Liste des villes
/zones-intervention/lille
/zones-intervention/roubaix
/zones-intervention/[...14 villes 59 & 62]
/tarifs                     Grille tarifaire
/a-propos                   Présentation de l'entreprise
/contact                    Formulaire + téléphone
/mentions-legales
/politique-confidentialite
```

## Actions manuelles après mise en ligne

| Action | Responsable | Quand |
|--------|-------------|-------|
| Acheter le nom de domaine (OVH/Gandi) | Freelance/Client | Avant déploiement |
| Créer le compte Resend et vérifier le domaine | Freelance | Avant livraison |
| Créer/revendiquer la fiche Google Business Profile | Client + Freelance | Dès le début |
| Configurer catégorie GBP : "Service de dépannage automobile" | Freelance | Avec le client |
| Ajouter horaires 24/7 + photos sur GBP | Client | Dès l'ouverture |
| Ajouter le site à Google Search Console | Freelance | Après mise en ligne |
| Soumettre le sitemap dans Search Console | Freelance | Après mise en ligne |
| Ajouter à Bing Webmaster Tools | Freelance | Après mise en ligne |
| Récolter les premiers avis clients | Client | En continu |

## SEO local

Chaque page ville (`/zones-intervention/[ville]`) contient :
- `<title>` unique avec ville + code postal + délai
- `<meta description>` unique avec CTA
- Un seul `<h1>` avec le nom de la ville
- Contenu unique (description, axes, délai spécifique)
- Balise canonical
- JSON-LD EmergencyService spécifique à la ville

## Sécurité

Les en-têtes HTTP de sécurité sont configurés dans `next.config.js` :
- `Content-Security-Policy` (CSP)
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`

Tester sur [securityheaders.com](https://securityheaders.com) après déploiement.

Le formulaire de contact est protégé par :
- Champ honeypot caché (anti-bot)
- Validation côté serveur (type, longueur, format tel)
- Sanitization HTML
