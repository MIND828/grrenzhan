/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07070B",
          900: "#0B0B11",
          850: "#101019",
          800: "#161620",
          700: "#1E1E2B",
          600: "#2A2A3A",
        },
        accent: {
          DEFAULT: "#E8762C",
          soft: "#F5934A",
          deep: "#C95E1A",
        },
        glow: "#F5934A",
      },
      fontFamily: {
        sans: ['"Inter"', '"PingFang SC"', '"Microsoft YaHei"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Inter"', '"PingFang SC"', "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', '"Noto Serif SC"', '"Source Han Serif SC"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1700px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 1.2s ease both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
