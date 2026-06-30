# SEO local — SM Dépannage

Système de référencement local pour les pages service × ville, avec garde
anti-pages-satellites. Ce document explique comment configurer, activer une ville
et utiliser l'outillage.

## Architecture

| Élément | Fichier |
| --- | --- |
| Config unique (URL, téléphone, canonical) | `lib/site.ts` |
| Données services | `lib/services.ts` |
| Données villes | `lib/villes.ts` |
| Garde anti-satellite | `lib/seo/quality.ts` |
| Route combinée | `app/depannage/[service]/[ville]/page.tsx` |
| Sitemap (combos validés seulement) | `app/sitemap.ts` |
| Robots | `app/robots.ts` |
| JSON-LD global (LocalBusiness) | `app/layout.tsx` |
| Composants SEO | `components/seo/JsonLd.tsx`, `components/seo/Nap.tsx` |
| Contrôle SEO | `scripts/check-seo.mjs` |
| Rapport Search Console | `scripts/search-console-report.mjs` |
| Audit Unlighthouse | `scripts/unlighthouse.mjs` |
| Lighthouse CI | `lighthouserc.cjs`, `.github/workflows/lighthouse.yml` |

## Principe anti-pages-satellites

Une page `/depannage/<service>/<ville>` n'est **indexable** que si la ville possède
un contenu local RÉEL et distinctif. Tant que ce n'est pas le cas, la page reste
**accessible** (rendu à la demande) mais en `noindex, follow` et **hors sitemap**.

`evaluateLocalPageQuality(service, ville)` exige, pour indexer :

1. service confirmé (`indexable !== false`) ;
2. ville activée (`indexable: true`) ;
3. `introductionLocale` rédigée (≥ 180 caractères) ;
4. au moins une entrée `preuvesLocales` ;
5. au moins 2 `quartiers` ;
6. `faqLocale` non vide ;
7. aucun placeholder résiduel.

Par défaut, **aucune** ville n'a ces champs → aucune page combinée n'est indexée
ni présente dans le sitemap. C'est volontaire : on n'indexe pas de contenu dupliqué.

## Configuration obligatoire

Dans `lib/site.ts` (déjà renseigné — à vérifier) : nom, URL, téléphone affiché et
`tel:`. Variables d'environnement : voir `.env.example`
(`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, et pour le rapport
GSC : `GSC_SITE_URL`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`).

## Activer une ville pour l'indexation

Dans `lib/villes.ts`, sur l'entrée concernée :

1. ajouter `introductionLocale` : un paragraphe RÉDIGÉ pour la ville (pas un copier-coller où seul le nom change) ;
2. ajouter `preuvesLocales` : informations vérifiables (axes précis, contraintes d'accès, repères réels) ;
3. ajouter `quartiers` : au moins 2 secteurs réellement desservis ;
4. ajouter `faqLocale` : questions/réponses propres au secteur ;
5. retirer tout placeholder (`TODO`, etc.) ;
6. passer `indexable: true` ;
7. lancer `npm run seo:check` ;
8. vérifier le sitemap (`/sitemap.xml`) ;
9. demander l'indexation dans Search Console.

Ne jamais inventer : adresse, avis, note, délai, tarif, partenariat ou zone non couverte.

## Commandes

```bash
npm run lint        # ESLint (next lint)
npm run typecheck   # tsc --noEmit
npm run seo:check   # doublons, placeholders, cohérence indexable
npm run build       # build de production
npm run lhci        # Lighthouse CI (après build + start)
npm run seo:test    # seo:check + build + lhci
npm run seo:audit   # Unlighthouse (NEXT_PUBLIC_SITE_URL requis)
npm run seo:gsc -- --days=28 --limit=50   # rapport Search Console
```

## Actions manuelles indispensables (hors code)

- [ ] Compléter / vérifier la fiche Google Business Profile.
- [ ] Vérifier le domaine dans Search Console.
- [ ] Soumettre le sitemap (`/sitemap.xml`).
- [ ] Confirmer le numéro de téléphone et les horaires réels.
- [ ] Obtenir des avis clients authentiques et y répondre.
- [ ] Publier des photos réelles d'interventions.
- [ ] Garder un NAP identique partout (site, GBP, annuaires).
- [ ] Compléter progressivement les villes avant de les passer `indexable`.
- [ ] Contrôler régulièrement les performances mobiles.
