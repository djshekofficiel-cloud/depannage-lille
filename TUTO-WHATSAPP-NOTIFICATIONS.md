# 📲 Tuto — Recevoir les demandes du chatbot sur ton WhatsApp

Ce guide te fait activer les notifications WhatsApp de **SM Dépannage** en ~5 minutes.
À la fin, chaque demande remplie dans le chatbot t'arrive **automatiquement sur WhatsApp**,
avec un lien pour rappeler le client en 1 clic.

> Tu n'as besoin que de **2 choses** : ton téléphone (avec WhatsApp) et un ordinateur
> connecté à ton compte Vercel.

---

## 🟢 ÉTAPE 1 — Obtenir ta clé CallMeBot (sur ton téléphone)

CallMeBot est le service gratuit qui envoie le WhatsApp. Il faut d'abord l'autoriser
à t'écrire, une seule fois.

1. **Ouvre les Contacts** de ton téléphone et crée un nouveau contact :
   - Nom : `CallMeBot` (ou ce que tu veux)
   - Numéro : **+34 623 91 22 04**
   - Enregistre.

   > ⚠️ Le numéro doit être saisi avec l'indicatif **+34** (Espagne). C'est normal.

2. **Ouvre WhatsApp**, va dans ce nouveau contact `CallMeBot`.
   (Si tu ne le vois pas : dans WhatsApp → Nouvelle discussion → tire vers le bas
   pour rafraîchir les contacts.)

3. **Envoie-lui exactement ce message** (copie-colle pour éviter les fautes) :

   ```
   I allow callmebot to send me messages
   ```

4. **Attends la réponse** (généralement < 2 min). Tu recevras un message du type :

   ```
   API Activated for your phone number. Your APIKEY is 1234567
   ```

   👉 **Le nombre après « APIKEY is » est TA CLÉ.** Note-la (ici ce serait `1234567`).

   > Si tu ne reçois rien : vérifie que le message est exactement le bon, puis
   > réessaie. En cas d'échec répété, attends 24 h et recommence (limite anti-spam).

✅ À la fin de l'étape 1 tu as : **ta clé API** (un nombre).

---

## 🔵 ÉTAPE 2 — Ajouter 2 variables dans Vercel (sur ordinateur)

C'est ici qu'on dit au site « envoie les demandes sur le WhatsApp de Sébastien ».

1. Va sur la page des variables d'environnement du projet :

   ```
   https://vercel.com/djshekofficiel-9102s-projects/depannage-lille-w982/settings/environment-variables
   ```

2. Clique le bouton noir **« Add Environment Variable »** (en haut à droite).

3. **Première variable — ton numéro :**
   - **Key** (le nom, à taper exactement) : `CALLMEBOT_PHONE`
   - **Value** (la valeur) : ton numéro WhatsApp au **format international**
     - Un numéro français qui commence par `06 12 34 56 78` s'écrit **`+33612345678`**
       (on enlève le premier `0` et on met `+33` devant, sans espaces).
     - Pareil pour un `07…` → `+337…`
   - **Environments** : laisse **Production**, **Preview** et **Development** cochés.
   - Clique **Save**.

4. Clique de nouveau **« Add Environment Variable »**.

5. **Deuxième variable — ta clé :**
   - **Key** : `CALLMEBOT_APIKEY`
   - **Value** : la clé reçue à l'étape 1 (le nombre, ex. `1234567`)
   - **Environments** : les 3 cochés.
   - Clique **Save**.

✅ À la fin de l'étape 2, la liste doit afficher **3 variables** :
`MISTRAL_API_KEY`, `CALLMEBOT_PHONE`, `CALLMEBOT_APIKEY`.

> 🔐 Pourquoi c'est toi qui colles la clé ? Une clé API est un secret : par sécurité,
> elle doit être saisie directement par toi, jamais transmise via le chat.

---

## 🟠 ÉTAPE 3 — Redéployer (pour activer les variables)

Une variable n'est prise en compte qu'au **prochain déploiement**.

1. Va dans l'onglet **Deployments** :

   ```
   https://vercel.com/djshekofficiel-9102s-projects/depannage-lille-w982/deployments
   ```

2. Sur la ligne du **dernier déploiement** (celui marqué « Production »), clique les
   **⋯** (trois points) à droite → **Redeploy** → confirme **Redeploy**.

3. Attends que le statut repasse à **Ready** (~1-2 min).

> 💡 Plus simple : dis-le moi, je déclenche le redéploiement à ta place.

---

## ✅ ÉTAPE 4 — Tester en vrai

1. Ouvre le site : **https://www.sm-depannage59.fr**
2. Clique la bulle rouge en bas à droite pour ouvrir le chat.
3. Joue le rôle d'un client, donne tout : lieu, véhicule + plaque, type de panne,
   ton prénom et **un numéro** (mets ton propre numéro pour le test).
4. Quand le bot confirme la demande → **regarde ton WhatsApp** : tu dois recevoir un
   message comme :

   ```
   🚗 NOUVELLE DEMANDE SM-XXXX ⚠️ URGENT

   👤 Marc
   📞 06 12 34 56 78
   📍 Lille, rue Nationale
   🔧 Panne : batterie
   🚙 Véhicule : Renault Clio
   🔖 Plaque : AB-123-CD

   ➡️ Rappeler le client : https://wa.me/33612345678
   ```

5. Clique le lien **« Rappeler le client »** → WhatsApp/appel s'ouvre vers le client. 🎉

---

## 🛠️ En cas de problème

| Symptôme | Cause probable | Solution |
|----------|----------------|----------|
| Pas de WhatsApp reçu | Variables non prises en compte | As-tu **redéployé** (étape 3) ? |
| Pas de WhatsApp reçu | Clé ou numéro faux | Revérifie `CALLMEBOT_APIKEY` et le format `+33…` |
| « API not activated » | Étape 1 incomplète | Renvoie le message d'autorisation au +34 623 91 22 04 |
| Rien ne s'envoie après plusieurs essais | Limite CallMeBot atteinte | Attends quelques minutes (service gratuit, débit limité) |

---

## ℹ️ Bon à savoir

- **CallMeBot gratuit** = notifications **vers toi uniquement** (parfait pour ton usage).
- Le client, lui, n'a rien à installer : il discute sur le site, et **toi** tu le rappelles.
- La demande part **aussi par email** si tu configures Resend un jour (canal de secours).
- Pour répondre au client : utilise le **lien wa.me** du message (WhatsApp) ou appelle
  son numéro directement.

---

*Besoin d'aide ? Donne-moi ton numéro (pas la clé) et je crée `CALLMEBOT_PHONE` pour toi,
puis je déclenche le redéploiement et on teste ensemble.*
