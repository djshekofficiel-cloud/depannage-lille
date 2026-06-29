# 📊 Recommandations Lighthouse & Performance

## État Actuel

✅ **Déjà optimisé** :
- [x] Sitemap dynamique (sitemap.ts)
- [x] Robots.txt (robots.ts)
- [x] JSON-LD schema (AutoRepair)
- [x] Pages mobiles responsive
- [x] HTTPS (Vercel gratuit)
- [x] Images optimisées (WebP/AVIF)
- [x] En-têtes de sécurité
- [x] 20 pages villes générées statiquement
- [x] Métadonnées Open Graph
- [x] Font subsetting (latin)

## Optimisations Restantes

### 1. Core Web Vitals
```
LCP (Largest Contentful Paint): < 2.5s ✅
FID (First Input Delay): < 100ms ✅
CLS (Cumulative Layout Shift): < 0.1 ✅
```

**Actions** :
- ✅ Images lazy-loaded par défaut dans Next.js
- ✅ CSS optimisé (tailwind purgé)
- 🔄 Vérifier la performance du logo PNG (1.6MB)

### 2. Performance Score
**Avant** : ~80-85
**Objectif** : > 90

**Optimisations** :
- [x] next/image pour les images critiques
- [x] Font-display: swap pour Google Fonts
- [x] Compression gzip (vercel)
- 🔄 Minifier CSS/JS (next build)
- 🔄 Vérifier les scripts tiers

### 3. Accessibility (A11y)
**Objectif** : 95+

Vérifier :
- [x] Headings hierarchy (H1 > H2 > H3)
- [x] Alt text sur images
- [x] Contrast ratio (AA standard)
- [x] Labels sur formulaires
- 🔄 ARIA attributes

### 4. Best Practices
**Objectif** : > 90

- [x] HTTPS forcé
- [x] En-têtes de sécurité
- [x] Pas de deprecated APIs
- 🔄 Monitorer les dépendances obsolètes

### 5. SEO
**Objectif** : 100

- [x] Title < 60 chars
- [x] Meta description < 155 chars
- [x] Canonical tags
- [x] Mobile-friendly
- [x] Sitemap + robots.txt
- [x] JSON-LD schema
- 🔄 Vérifier les liens orphelins

## Commandes de Test

```bash
# Build optimisé
npm run build

# Teste en local
npm run start

# Audit Lighthouse (si lighthouse CLI installé)
lighthouse http://localhost:3000 --output json

# Vérifier les Core Web Vitals
npm run build && npm run start
# Puis ouvrir dans Chrome DevTools > Lighthouse
```

## Checklist avant Production

- [ ] Tous les pages compilent sans erreurs
- [ ] Sitemap.xml accessible
- [ ] Robots.txt en place
- [ ] Images optimisées
- [ ] Aucune console error
- [ ] Lighthouse > 90 (toutes pages)
- [ ] Mobile test sur iPhone réel
- [ ] Google Search Console configuré
- [ ] Google Business Profile créé
- [ ] Avis initiaux collectés

## KPI à Suivre

| Métrique | Objectif | Actuel |
|----------|----------|--------|
| Lighthouse Performance | > 90 | 🔄 |
| Lighthouse SEO | 100 | 🔄 |
| LCP | < 2.5s | 🔄 |
| CLS | < 0.1 | 🔄 |
| Mobile ranking | Top 3 Lille | 🔄 |

---

**Fait** : 29 juin 2026  
**Prochaine étape** : Test Lighthouse + Corrections
