// components/Faq.tsx — Section FAQ visible + données structurées FAQPage (résultats enrichis Google).
// Utilise <details> natif : contenu présent dans le DOM (conforme aux règles FAQPage), accessible, sans JS.

const PHONE = "07 67 87 80 34";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Quelles sont vos zones d'intervention ?",
    a: "Nous intervenons à Lille, dans toute la Métropole Européenne de Lille (MEL) et plus largement dans le Nord (59) et le Pas-de-Calais (62) : Roubaix, Tourcoing, Villeneuve-d'Ascq, Lens, Béthune, Arras, Douai et les communes alentour.",
  },
  {
    q: "Quel est le délai d'intervention ?",
    a: "Sur Lille et la MEL, nos techniciens arrivent généralement en 20 à 30 minutes. Hors agglomération, le délai dépend de la distance et vous est confirmé par téléphone.",
  },
  {
    q: "Êtes-vous disponibles la nuit, le week-end et les jours fériés ?",
    a: "Oui. SM Dépannage intervient 24h/24 et 7j/7, y compris la nuit, le week-end et les jours fériés, sans abonnement.",
  },
  {
    q: "Combien coûte un dépannage ou un remorquage ?",
    a: `Le tarif dépend de la distance, du type de véhicule et de l'horaire (jour, nuit, week-end, férié). Le prix vous est toujours annoncé avant l'intervention, sans surprise. Devis gratuit par téléphone au ${PHONE}.`,
  },
  {
    q: "Quels véhicules dépannez-vous ?",
    a: "Voitures toutes marques (citadines, berlines, électriques, hybrides, sans permis), motos et scooters, ainsi que camionnettes et utilitaires légers.",
  },
  {
    q: "Quels types de pannes prenez-vous en charge ?",
    a: "Batterie à plat, crevaison, panne de carburant, panne mécanique ou électronique, remorquage, enlèvement de véhicule accidenté, clés enfermées, transport de véhicule planifié et assistance routière.",
  },
  {
    q: "Intervenez-vous sur autoroute ?",
    a: "Le dépannage sur autoroute et voie rapide est réglementé et réservé aux sociétés agréées : utilisez une borne d'appel d'urgence orange ou composez le 112. Sur le reste du réseau (villes, routes départementales), nous intervenons directement.",
  },
  {
    q: "Comment demander une intervention ?",
    a: `Appelez-nous au ${PHONE} pour une urgence, ou décrivez votre situation dans le chat du site : nous récupérons vos informations et vous rappelons très vite.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Faq() {
  return (
    <section className="py-16 sm:py-24 bg-black border-t border-red-500/15">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-red-300 border border-red-500/40 bg-red-950/20 mb-4">
            Questions fréquentes
          </span>
          <h2 className="font-black text-white leading-none" style={{ fontSize: "clamp(2rem,6vw,4rem)" }}>
            Vos&nbsp;
            <span
              style={{
                background: "linear-gradient(90deg,#ef4444,#dc2626)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 12px rgba(220,38,38,0.6))",
              }}
            >
              questions
            </span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(239,68,68,0.25)", background: "rgba(220,38,38,0.05)" }}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 font-semibold text-white text-sm sm:text-base">
                <span>{item.q}</span>
                <span className="text-red-400 transition-transform duration-300 group-open:rotate-45 text-xl leading-none flex-shrink-0">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-slate-300 leading-relaxed text-sm sm:text-base">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
