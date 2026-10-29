import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        motolantic: {
          navy: "#10243A",      // Biru Malam - Identitas utama, judul, navigasi
          navyDark: "#0A1726",  // Variasi gelap untuk kedalaman hero Gearlantic
          orange: "#FF6B35",    // Jingga Terang - Aksen merek & tombol utama
          orangeHover: "#E85A25",
          warmWhite: "#F5F7FA", // Putih Hangat - Latar bersih & ruang baca
          steel: "#667085",     // Abu Baja - Informasi pendukung & sekunder
          cyan: "#00D2FF",      // Aksen jaringan global pada visual hero
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
