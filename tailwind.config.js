/** @type {import('tailwindcss').Config} */

module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: "#__next",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1280px",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)"],
        bubble: ["var(--font-bubblegum)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
};
