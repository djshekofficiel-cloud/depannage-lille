// lib/services.ts — Données des services proposés

export interface Service {
  slug: string;
  nom: string;
  icon: string;       // emoji ou nom Lucide
  titre: string;      // H1 / titre SEO
  description: string; // meta description
  resume: string;     // résumé court (card)
  contenu: string;    // texte long unique
}

export const services: Service[] = [
  {
    slug: "remorquage",
    nom: "Remorquage",
    icon: "🚛",
    titre: "Remorquage auto Lille & Métropole — Intervention 24h/24",
    description:
      "Service de remorquage rapide à Lille et dans toute la MEL. Véhicule léger, utilitaire ou moto, nous remorquons 24h/24 et 7j/7.",
    resume: "Remorquage de votre véhicule vers le garage ou la destination de votre choix.",
    contenu: `Notre service de remorquage couvre Lille, la Métropole Européenne de Lille ainsi que les départements 59 et 62.
    
Nos camions plateau et dépanneuses prennent en charge tous types de véhicules : voitures particulières, utilitaires légers, motos et scooters.
    
**Pourquoi choisir notre remorquage ?**
- Disponibilité 24h/24, 7j/7, jours fériés inclus
- Flotte de véhicules équipés (plateau, sangles, triangles de signalisation)
- Tarifs transparents annoncés avant intervention
- Délai moyen de 30 minutes sur Lille intra-muros

**Zones couvertes :** A1, A22, A25, périphérique lillois, MEL, et tout le 59/62.`,
  },
  {
    slug: "depannage-sur-place",
    nom: "Dépannage sur place",
    icon: "🔧",
    titre: "Dépannage auto sur place Lille — Mécanicien mobile 24h/24",
    description:
      "Mécanicien mobile à Lille : panne moteur, courroie, boîte de vitesses. Dépannage sur place rapide, 24h/24.",
    resume: "Mécanicien mobile qui vient à vous pour réparer votre voiture sans attendre.",
    contenu: `Vous êtes tombé en panne et votre voiture ne démarre plus ? Avant de penser au remorquage, notre mécanicien mobile se déplace pour diagnostiquer et réparer votre véhicule sur place.
    
**Pannes traitées en intervention :**
- Courroie de distribution cassée
- Embrayage défaillant
- Problème de démarreur ou d'alternateur
- Boîte de vitesses bloquée
- Problème d'injection (diagnostic OBD)

**Notre engagement :** si la réparation est impossible sur route, nous remorquons votre véhicule vers le garage partenaire le plus proche.`,
  },
  {
    slug: "depannage-batterie",
    nom: "Batterie à plat",
    icon: "⚡",
    titre: "Batterie à plat Lille — Remplacement & démarrage d'urgence",
    description:
      "Batterie à plat à Lille ? Démarrage d'urgence ou remplacement de batterie en 30 min. Service 24h/24 dans le 59 et 62.",
    resume: "Démarrage d'urgence ou remplacement de batterie auto en moins de 30 min.",
    contenu: `La batterie à plat est la panne la plus fréquente, surtout en hiver. Notre équipe intervient en urgence pour :

**1. Démarrage d'urgence (booster)**
Nous utilisons des boosters professionnels pour démarrer votre véhicule en quelques minutes, même par grand froid.

**2. Remplacement de batterie**
Si la batterie est HS, nous disposons d'un stock de batteries pour les marques les plus courantes (Bosch, Varta, Exide). Remplacement sur place, garantie incluse.

**Délai moyen :** 20 à 30 minutes sur Lille et proche banlieue.`,
  },
  {
    slug: "crevaison-pneu",
    nom: "Crevaison / Pneu",
    icon: "🛞",
    titre: "Crevaison pneu Lille — Changement de roue d'urgence 24h/24",
    description:
      "Pneu crevé à Lille ou sur autoroute ? Changement de roue ou montage de roue de secours en urgence. Intervention 24h/24.",
    resume: "Pneu crevé ? Changement de roue de secours ou dépannage pneumatique rapide.",
    contenu: `Une crevaison sur l'A1 ou en plein Lille peut vite devenir dangereuse. Voici ce que nous faisons pour vous :

**Montage de la roue de secours**
Si vous avez une roue de secours en bon état, nous la montons immédiatement.

**Remplacement de pneu**
Nous transportons un stock limité de pneus courants. Si votre taille est disponible, remplacement sur place.

**Gonflage d'urgence**
Pour une crevaison lente, nous pouvons regonfler le pneu et vous escorter jusqu'au centre auto le plus proche.

⚠️ **Sécurité :** Sur autoroute, placez-vous sur la bande d'arrêt d'urgence et activez vos feux de détresse avant d'appeler.`,
  },
  {
    slug: "transport-vehicule",
    nom: "Transport de véhicule",
    icon: "🚗",
    titre: "Transport de véhicule Lille & Nord Pas-de-Calais — Plateau auto",
    description:
      "Transport de véhicule sur plateau à Lille, dans le 59 et 62. Livraison chez votre garagiste ou à domicile. Devis gratuit.",
    resume: "Transport de votre voiture sur plateau vers la destination de votre choix.",
    contenu: `Notre service de transport de véhicule sur plateau est idéal pour :

**Quand y recourir ?**
- Après achat d'un véhicule non roulant
- Transfert entre concessionnaires ou garages
- Rapatriement après accident ou sinistre
- Véhicule sans permis de circuler (contrôle technique refusé)

**Zone de transport**
Nous assurons les transports sur toute la MEL, le 59, le 62, et selon devis vers le reste de la France.

**Tarification**
Le tarif est calculé selon la distance et le type de véhicule. Appelez-nous pour un devis gratuit en moins de 5 minutes.`,
  },
  {
    slug: "depannage-moto",
    nom: "Dépannage moto",
    icon: "🏍️",
    titre: "Dépannage moto & scooter Lille — Remorquage 2 roues 24h/24",
    description:
      "Panne moto ou scooter à Lille ? Remorquage sécurisé 2 roues, arrimage professionnel. Intervention rapide 24h/24 sur la MEL, le 59 et le 62.",
    resume: "Remorquage et dépannage motos, scooters et maxi-scooters en toute sécurité.",
    contenu: `Une panne sur deux roues nécessite un matériel et un savoir-faire spécifiques. SM Dépannage prend en charge :

**Véhicules concernés**
- Motos et maxi-scooters
- Scooters 50 à 125 cm³
- Cyclomoteurs et 3 roues motorisés légers

**Nos prestations moto**
- Remorquage sur plateau avec arrimage sangles et cales
- Dépannage batterie (démarrage d'urgence)
- Crevaison — gonflage d'urgence ou transport vers garage
- Rapatriement après chute ou panne mécanique

**Sécurité**
Sur route ou autoroute, restez équipé (gilet, triangle) et appelez-nous. Nous intervenons en 20–30 min sur Lille et la MEL.`,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
