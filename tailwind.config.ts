import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  
  ],
  safelist: [
    "backdrop-blur",
    "backdrop-blur-md",
    "bg-white/60",
    "bg-white/70",
    "bg-black/40",
    "border-white/30",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#FEFEFE",
          200: "#F3F5F7",
          300: "#E8ECEF",
          400: "#6C7275",
          500: "#343839",
          600: "#232627",
          700: "#141718",
          800: "#000000",
        },
        secondary: {
          100: "#FFAA00B9",
          200: "#377DFF",
        },
      },
      animation: {
        "fade-in": "fadeIn 1.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      screens: {
        "max-lg": { max: "1100px" },
      },
    },
  },
  plugins: [],
};

export default config;
