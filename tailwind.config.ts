import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#D4AF37",
        },
        base: {
          black: "#000000",
          charcoal: "#111111",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        brand: ["var(--font-cinzel)", "serif"],
      },
      letterSpacing: {
        premium: "0.16em",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212, 175, 55, 0.3), 0 12px 32px rgba(0, 0, 0, 0.45)",
      },
    },
  },
};

export default config;
