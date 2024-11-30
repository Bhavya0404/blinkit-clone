import { url } from "inspector";
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
        'cart-green': '#0C831F',
        'location-bg': '#F4F7FD',
        'white-bg': 'url("https://cdn.grofers.com/layout-engine/2021-10/white-bg-1.png")',
        'earliest-bg': ' rgb(248, 248, 248)',
        'weight-unit-text': '#666666',
        'add-button': 'rgb(49, 134, 22)',
        'card-box-shadow': 'rgba(0, 0, 0, 0.04) 2px 2px 8px',
        'card-bg': 'rgb(255, 255, 255)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
