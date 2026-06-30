// components/Logo.tsx — Identité SM Dépannage

import Image from "next/image";

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
      <Image
        src="/logo-sm-depannage.svg"
        alt="SM Dépannage"
        width={36}
        height={36}
        className="h-full w-full object-contain"
        priority
      />
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
