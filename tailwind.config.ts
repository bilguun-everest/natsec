import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // The full desktop navigation collapses below this width.
        nav: "1161px",
      },
      colors: {
        navy: { DEFAULT: "#14225F", 900: "#0C1440" },
        blue: {
          DEFAULT: "#48BEE6",
          text: "#0E7EAE",
          soft: "#E9F6FC",
          hover: "#2FAEDE",
        },
        ink: "#1A1D26",
        grey: "#6B7180",
        line: "#E2E5EC",
        paper: "#FBFBFD",
        up: "#0E8A5F",
        down: "#C93B3B",
        gold: "#B8933D",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Archivo carries no Cyrillic — Inter picks up Mongolian headings.
        display: [
          "var(--font-display)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // The tögrög sign is missing from JetBrains Mono.
        tg: ["Arial", "Noto Sans", "sans-serif"],
      },
      boxShadow: {
        drop: "0 18px 44px rgba(20,31,93,.13)",
        lift: "0 10px 30px rgba(20,31,93,.08)",
        card: "0 12px 32px rgba(20,31,93,.1)",
        cta: "0 6px 18px rgba(72,190,230,.35)",
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".35" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
