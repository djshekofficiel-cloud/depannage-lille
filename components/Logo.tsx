// components/Logo.tsx — Identité SM Dépannage

interface LogoMarkProps {
  className?: string;
  glow?: boolean;
}

export function LogoMark({ className = "h-9 w-9", glow = true }: LogoMarkProps) {
  return (
    <span className={`relative inline-grid place-items-center ${className}`}>
      {glow && (
        <span aria-hidden className="absolute inset-0 rounded-[28%] bg-sm-red-500/40 blur-md -z-10" />
      )}
      <svg viewBox="0 0 48 48" className="h-full w-full" role="img" aria-label="SM Dépannage">
        <defs>
          <linearGradient id="nd-badge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b71c1c" />
            <stop offset="0.55" stopColor="#d32f2f" />
            <stop offset="1" stopColor="#ff4444" />
          </linearGradient>
          <linearGradient id="nd-bolt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff7e6" />
            <stop offset="1" stopColor="#ffcf7a" />
          </linearGradient>
        </defs>
        {/* Badge */}
        <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#nd-badge)" />
        {/* Reflet supérieur */}
        <rect x="2" y="2" width="44" height="20" rx="13" fill="#ffffff" opacity="0.14" />
        {/* Monogramme N (montants blancs) */}
        <path
          d="M15 34 V16 L33 34 V16"
          fill="none"
          stroke="#ffffff"
          strokeWidth="5.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Diagonale = éclair lumineux */}
        <path d="M15 16 L33 34" fill="none" stroke="url(#nd-bolt)" strokeWidth="5.4" strokeLinecap="round" />
        {/* Glint */}
        <circle cx="33" cy="16" r="2.1" fill="#ffffff" />
      </svg>
    </span>
  );
}

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  markClassName?: string;
  glow?: boolean;
}

export default function Logo({ variant = "full", className = "", markClassName = "h-9 w-9", glow = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} glow={glow} />
      {variant === "full" && (
        <span className="font-display font-extrabold text-lg leading-none text-white">
          SM<span className="text-sm-red"> Dépannage</span>
        </span>
      )}
    </span>
  );
}
