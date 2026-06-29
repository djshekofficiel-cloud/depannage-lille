"use client";
// Effet StarsCanvas — étoiles orbitantes ambrées sur fond transparent
// Source : 21st.dev/community (adapté hue amber, canvas pur, sans dépendance)

import { useEffect, useRef } from "react";

interface StarsCanvasProps {
  maxStars?: number;
  hue?: number;
  brightness?: number;
  speedMultiplier?: number;
}

export function StarsCanvas({
  maxStars = 400,
  hue = 28,
  brightness = 7,
  speedMultiplier = 0.5,
}: StarsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId: number;

    // Texture étoile amber (radial gradient mis en cache)
    const tex = document.createElement("canvas");
    tex.width = tex.height = 100;
    const tc = tex.getContext("2d")!;
    const half = 50;
    const g = tc.createRadialGradient(half, half, 0, half, half, half);
    g.addColorStop(0.025, "#fff");
    g.addColorStop(0.1, `hsl(${hue}, 85%, 55%)`);
    g.addColorStop(0.25, `hsl(${hue}, 70%, 10%)`);
    g.addColorStop(1, "transparent");
    tc.fillStyle = g;
    tc.beginPath();
    tc.arc(half, half, half, 0, Math.PI * 2);
    tc.fill();

    const maxOrbit = (x: number, y: number) =>
      Math.round(Math.sqrt(x * x + y * y)) / 2;

    type Star = {
      orbitRadius: number;
      radius: number;
      orbitX: number;
      orbitY: number;
      timePassed: number;
      speed: number;
      alpha: number;
    };

    const createStar = (): Star => {
      const or = Math.random() * maxOrbit(w, h);
      return {
        orbitRadius: or,
        radius: Math.max(0.6, (Math.random() * 50 + 50) / Math.max(or, 1) / 1.2),
        orbitX: w / 2,
        orbitY: h / 2,
        timePassed: Math.random() * maxStars,
        speed: (Math.random() * or) / 50000 * speedMultiplier,
        alpha: (Math.random() * 8 + 2) / 10 * (brightness / 10),
      };
    };

    const stars: Star[] = Array.from({ length: maxStars }, createStar);

    const drawStar = (s: Star) => {
      const x = Math.sin(s.timePassed) * s.orbitRadius + s.orbitX;
      const y = Math.cos(s.timePassed) * s.orbitRadius + s.orbitY;
      const twinkle = Math.floor(Math.random() * 20);
      if (twinkle === 1 && s.alpha > 0) s.alpha -= 0.05;
      else if (twinkle === 2 && s.alpha < 0.8) s.alpha += 0.05;
      ctx.globalAlpha = s.alpha;
      ctx.drawImage(tex, x - s.radius / 2, y - s.radius / 2, s.radius, s.radius);
      s.timePassed += s.speed;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      stars.forEach(drawStar);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars.forEach((s) => {
        s.orbitX = w / 2;
        s.orbitY = h / 2;
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [maxStars, hue, brightness, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        opacity: 0.35,
      }}
    />
  );
}
