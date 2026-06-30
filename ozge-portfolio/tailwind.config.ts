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
        bg: "#0B1120",
        "bg-2": "#0F1729",
        "bg-3": "#111827",
        accent: "#6366F1",
        "accent-light": "#818CF8",
        "accent-dim": "#4338CA",
        "text-primary": "#F1F5F9",
        "text-secondary": "#94A3B8",
        "text-muted": "#475569",
        "border-subtle": "#1E2D4A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "radar": "radar 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        radar: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      boxShadow: {
        "glow-accent": "0 0 20px rgba(99,102,241,0.4)",
        "glow-sm": "0 0 10px rgba(99,102,241,0.2)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(99,102,241,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
