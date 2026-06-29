"use client";
// Effet BorderBeam — faisceau lumineux qui parcourt la bordure d'une carte
// Source : 21st.dev/community (porté en CSS pur, sans Framer Motion)

import { CSSProperties, useEffect, useRef } from "react";

interface BorderBeamProps {
  duration?: number;
  lightColor?: string;
  lightWidth?: number;
  className?: string;
}

export function BorderBeam({
  duration = 9,
  lightColor = "#d32f2f",
  lightWidth = 200,
  className = "",
}: BorderBeamProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      el.style.setProperty("--beam-path", `path("M 0 0 H ${w} V ${h} H 0 V 0")`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden ${className}`}
      style={{
        "--beam-duration": `${duration}s`,
        "--beam-color": lightColor,
        "--beam-size": `${lightWidth}px`,
      } as CSSProperties}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "var(--beam-size)",
          height: "var(--beam-size)",
          background: `radial-gradient(ellipse at center, var(--beam-color) 0%, transparent 65%)`,
          offsetPath: "var(--beam-path)",
          animation: "border-beam var(--beam-duration) linear infinite",
          transform: "translate(-50%, -50%)",
          opacity: 0.55,
        }}
      />
    </div>
  );
}
