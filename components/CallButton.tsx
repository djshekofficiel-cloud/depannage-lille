// components/CallButton.tsx
// Bouton d'appel sticky mobile — dégradé emerald + halo pulsé.

export default function CallButton() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden px-3 pt-3 pb-3 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent pointer-events-none">
      <a
        href="tel:07 67 87 80 34"
        className="w-full block text-base sm:text-lg py-3.5 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/40 pointer-events-auto"
        aria-label="Appeler le dépanneur maintenant"
      >
        <span className="relative flex h-2.5 w-2.5 inline-block mr-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 animate-pulse" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        Appeler 24h/24
      </a>
    </div>
  );
}
