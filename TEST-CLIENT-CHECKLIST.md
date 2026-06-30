# 📋 TEST CLIENT — SM DÉPANNAGE 59

**Date :** 30 juin 2026  
**Version :** 1.0 (Production)  
**URL :** https://www.sm-depannage59.fr  
**Statut :** 🟢 EN LIGNE

---

## 🎯 OBJECTIF DU TEST

Vérifier que toutes les fonctionnalités **critiques** et **nouvelles** de votre site de dépannage auto sont opérationnelles avant la mise en ligne complète.

**Durée estimée :** 15–20 min  
**Appareils à tester :** Desktop + Mobile (iPhone/Android)

---

## ✅ CHECKLIST DE TEST

### 📱 **1. DISPONIBILITÉ & URGENCE (Design)**

#### Desktop
- [ ] **Page d'accueil** — Badge vert "Disponible 24h/24 · 7j/7" visible en haut
- [ ] **Badge urgence** — "🚨 Urgence ou panne en cours ?" rouge-bleu **pulsant** (animation)
- [ ] **Clic sur urgence** — Ouvre l'appel téléphonique vers **07 67 87 80 34**
- [ ] **Bouton appel mobile (bottom)** — "Appeler maintenant" vert présent

#### Mobile (iPhone/Android)
- [ ] Layout responsive — aucun débordement
- [ ] Bouton appel fixe en bas — cliquable et accessible
- [ ] Texte "Disponible 24h" visible et lisible (vert)

---

### 💬 **2. CHATBOT MISTRAL AI**

#### Chat en bas à droite
- [ ] **Widget chat** visible et accessible
- [ ] **Clic sur widget** — Ouvre un formulaire de discussion
- [ ] **Entrée de message** — Vous pouvez taper une question
- [ ] **Géolocalisation** — Le chatbot détecte votre ville et donne le délai d'intervention
  - Exemple : "Combien de temps pour Lille ?" → Réponse : "20 à 30 min"

> **Test :** "Je suis à Roubaix, combien de temps ?"

---

### 📞 **3. WHATSAPP CALLMEBOT**

#### Formulaire de contact
- [ ] **Page `/contact`** accessible (lien dans menu)
- [ ] Remplissez le formulaire avec :
  - Nom : "Test Client"
  - Téléphone : votre numéro
  - Message : "Test WhatsApp CallMeBot"
- [ ] **Clic "Envoyer"**
- [ ] **Attendre 10–15 sec** — Vous devriez recevoir un WhatsApp de "CallMeBot" avec votre demande
  - Message reçu : "SMS/WhatsApp depuis SM Dépannage"

> **Important :** Le WhatsApp devrait venir de **CallMeBot** (numéro du service)

---

### 📧 **4. EMAIL RESEND**

#### Après l'envoi du formulaire
- [ ] Vous devriez recevoir un **email de confirmation** (contact@smdepannage59.fr)
  - Objet : "Nouvelle demande reçue"
  - Contenu : Résumé de votre demande

---

### 📊 **5. SEO & MÉTADONNÉES**

#### Partage sur réseaux (teste Open Graph)
- [ ] Copiez l'URL : `https://www.sm-depannage59.fr`
- [ ] Collez-la dans un **message WhatsApp, Facebook ou Discord**
- [ ] La **vignette (preview)** doit afficher :
  - ✓ Image : Logo SM Dépannage (noir/rouge)
  - ✓ Titre : "Dépannage auto Lille & Métropole 24h/24"
  - ✓ Description : "Remorquage, batterie, pneu, panne moteur..."
  - ✓ "DISPONIBLE 24H/24" en **VERT**

---

### 🗺️ **6. ZONES D'INTERVENTION**

#### Page `/zones-intervention`
- [ ] **Liste complète** des 21 villes visibles
- [ ] Cliquez sur une ville (ex: Lille, Roubaix, Tourcoing)
- [ ] **Page dynamique** s'affiche avec :
  - ✓ Nom de la ville
  - ✓ Délai d'intervention (20–30 min)
  - ✓ Tarif estimé
  - ✓ Code postal et description locale
  - ✓ Lien d'appel cliquable

---

### 🔧 **7. SERVICES**

#### Page `/services`
- [ ] 7 services affichés :
  - ✓ Remorquage
  - ✓ Dépannage sur place
  - ✓ Batterie
  - ✓ Crevaison/Pneu
  - ✓ Panne moteur
  - ✓ Etc.
- [ ] Cliquez sur chaque service → Page détaillée avec :
  - ✓ Description complète
  - ✓ Prix moyen
  - ✓ Zones où ce service est disponible

---

### 📋 **8. MENTIONS LÉGALES & CONFORMITÉ**

#### Page `/mentions-legales`
- [ ] Tous les détails présents :
  - ✓ Nom : **Slimane MANKAA**
  - ✓ SIREN : **807 790 761**
  - ✓ SIRET : **807 790 761 00017**
  - ✓ TVA : **FR52807790761**
  - ✓ Adresse : **105 Rue Delannoy, 59160 Lille**
  - ✓ Date création : **11 août 2023**
  - ✓ Hébergeur : **Vercel Inc.**

#### Page `/politique-confidentialite`
- [ ] RGPD expliqué
- [ ] Droit d'accès, rectification, suppression

---

### 🎨 **9. DESIGN & UX**

#### General
- [ ] **Animations fluides** — Pas de lag/saccades
- [ ] **Couleurs correctes** :
  - ✓ Disponible 24h : **VERT** (émeraude)
  - ✓ Urgence : **ROUGE → BLEU** (neon pulsant)
  - ✓ Logo : Noir/blanc
- [ ] **Fonts lisibles** — Pas de coupures de texte
- [ ] **Icônes chargées** — Pas de "broken image"

#### Mobile responsiveness
- [ ] Redimensionnez navigateur (ou testez sur vrai téléphone)
- [ ] Vérifiez à : 375px (iPhone SE), 768px (iPad), 1200px (Desktop)
- [ ] Tous les éléments restent accessibles et centrés

---

### 🔒 **10. SÉCURITÉ**

#### HTTPS/SSL
- [ ] Cliquez sur le 🔒 (cadenas) près de l'URL
- [ ] Certificat doit afficher :
  - ✓ Domaine : **sm-depannage59.fr**
  - ✓ Émetteur : **Vercel** (auto-renouvelé)

#### Pas de contenu non-sécurisé (mixed content)
- [ ] Ouvrez la console navigateur (F12) → Onglet "Console"
- [ ] Vérifiez qu'il **n'y a pas d'erreurs** en rouge

---

### 📱 **11. PWA (PROGRESSIVE WEB APP)**

#### Desktop
- [ ] Ouvrez https://www.sm-depannage59.fr
- [ ] Cliquez sur les 3 points (menu navigateur) → "Installer l'application"
- [ ] L'app s'installe sur le bureau

#### Mobile
- [ ] Ouvrez le site sur votre téléphone
- [ ] Menu (⋮) → "Ajouter à l'écran d'accueil"
- [ ] Un raccourci "SM Dépannage" s'ajoute

---

## 📝 **12. FORMULAIRE DE CONTACT**

#### Test complet
1. Allez à `/contact`
2. Remplissez tous les champs :
   - Nom
   - Téléphone (votre numéro)
   - Message
3. Cliquez "Envoyer"
4. **Attendez 30 sec** — Vérifiez :
   - ✓ Email reçu
   - ✓ WhatsApp reçu (CallMeBot)
   - ✓ Pas de message d'erreur

---

## 🐛 **RAPPORT DE TEST**

Une fois le test terminé, envoyez ce rapport :

### Appareil testé
- [ ] Desktop (Windows / Mac)
- [ ] Mobile (iPhone / Android)
- [ ] Tablette (iPad / Galaxy Tab)

### Problèmes trouvés

Remplissez si vous rencontrez des bugs :

**Problème 1 :**
```
Page : [URL]
Description : [Ce qui ne fonctionne pas]
Steps : [Comment reproduire]
Navigateur : [Chrome/Firefox/Safari]
```

**Problème 2 :**
[Même format]

### Score général
```
Fonctionnalités critiques : ___/10
Design & UX : ___/10
Performance : ___/10
Sécurité : ___/10
```

---

## ✨ **NOUVELLES FONCTIONNALITÉS**

Résumé des nouveautés depuis la dernière version :

| Fonctionnalité | Status |
|----------------|--------|
| 🚨 Badge urgence (rouge-bleu neon) | ✅ |
| 💚 Disponible 24h en vert | ✅ |
| 💬 Chatbot Mistral AI + géolocalisation | ✅ |
| 📞 WhatsApp CallMeBot (07 67 87 80 34) | ✅ |
| 📧 Email Resend | ✅ |
| 📊 Google Analytics 4 | ✅ |
| 📋 Mentions légales complètes | ✅ |
| 🌐 21 zones d'intervention dynamiques | ✅ |
| 🔧 7 services détaillés | ✅ |
| 📱 PWA (installation app) | ✅ |

---

## 🚀 **PROCHAINES ÉTAPES (APRÈS VALIDATION CLIENT)**

1. **Google Business Profile** — Créer et compléter
2. **Annuaires** — Inscrire sur Pages Jaunes, Bing, Cylex
3. **Réseaux sociaux** — Créer pages Facebook/Instagram
4. **Google Ads** — Lancer campagne (10–20€/jour)
5. **Monitoring** — Vérifier Analytics et WhatsApp

---

## 📞 **SUPPORT**

En cas de problème pendant le test :
- Email : contact@smdepannage59.fr
- Téléphone : 07 67 87 80 34
- WhatsApp : https://wa.me/33767878034

---

**Merci pour votre test ! 🎉**

*Votre site est prêt pour la production.*
