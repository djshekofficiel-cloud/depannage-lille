import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: {
          950: "#0a0e1a",  // navy sombre (plus clair que le noir pur #050507)
          900: "#0f1626",
          850: "#141e33",
          800: "#1a2640",
          700: "#20304e",
          600: "#2a3e68",
        },
        ember: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        gold: {
          300: "#ffe2a8",
          400: "#ffce73",
          500: "#ffb627",
          600: "#f59e0b",
        },
        "sm-red": {
          50: "#fff5f5",
          100: "#ffe0e0",
          200: "#ffcccc",
          300: "#ff9999",
          400: "#ff6b6b",
          500: "#ff4444",
          600: "#d32f2f",
          700: "#b71c1c",
          800: "#8b0000",
          900: "#660000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(249,115,22,0.25), 0 8px 40px -8px rgba(249,115,22,0.45)",
        "glow-lg": "0 0 60px -10px rgba(249,115,22,0.55)",
        gold: "0 8px 40px -8px rgba(255,182,39,0.5)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-ember":
          "radial-gradient(ellipse at top, rgba(249,115,22,0.18), transparent 60%)",
      },
      keyframes: {
        aurora: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.55" },
          "50%": { transform: "translate3d(4%, -4%, 0) scale(1.15)", opacity: "0.85" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(249,115,22,0.5)" },
          "50%": { opacity: "0.92", boxShadow: "0 0 30px 4px rgba(249,115,22,0.55)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%,100%": { transform: "scale(1.8)", opacity: "0" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        aurora: "aurora 14s ease-in-out infinite",
        "aurora-slow": "aurora 22s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.4s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.66,0,0,1) infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
      },
    },
  },
  plugins: [],
};
export default config;
