"use client";

import { useEffect, useRef } from "react";

/**
 * GhostCursor — traînée lumineuse « fantôme » qui suit la souris (inertie + glow/bloom).
 * Version canvas maison (légère, sans WebGL). Désactivée sur écrans tactiles.
 */
export default function GhostCursor({
  trailLength = 35,
  inertia = 0.25,
  bloomStrength = 0.1,
  brightness = 1.2,
  color = "#6c00d0",
}: {
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  brightness?: number;
  color?: string;
  edgeIntensity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Pas de curseur sur appareils tactiles (pas de souris)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const pts = Array.from({ length: Math.max(6, trailLength) }, () => ({ x: w / 2, y: h / 2 }));
    const mouse = { x: w / 2, y: h / 2 };
    let active = false;
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      active = true;
    };
    window.addEventListener("mousemove", onMove);

    const ease = 1 - Math.min(0.95, Math.max(0, inertia));
    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      if (active) {
        pts[0].x += (mouse.x - pts[0].x) * ease;
        pts[0].y += (mouse.y - pts[0].y) * ease;
        for (let i = 1; i < pts.length; i++) {
          pts[i].x += (pts[i - 1].x - pts[i].x) * ease;
          pts[i].y += (pts[i - 1].y - pts[i].y) * ease;
        }

        ctx.globalCompositeOperation = "lighter";
        for (let i = pts.length - 1; i >= 0; i--) {
          const t = 1 - i / pts.length; // 1 = tête, 0 = queue
          const radius = 2 + t * 9;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 30 * (0.4 + bloomStrength * 6) * t;
          ctx.globalAlpha = Math.min(1, t * brightness * 0.55);
          ctx.arc(pts[i].x, pts[i].y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = "source-over";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [trailLength, inertia, bloomStrength, brightness, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }}
    />
  );
}
