/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "dark-purple": "#7b3aed",
      "light-purple": "#fcf3fb",
      black: "#1a1a1a",
      gray: "#757575",
      white: "#ffffff",
      red: "#D4183D",
    },
    fontFamily: {
      mono: ["Segoe UI", "monospace"],
      sans: ["Segoe UI", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      serif: ["Segoe UI", "sans-serif"],
      display: ["Segoe UI", "sans-serif"],
      body: ["Segoe UI", "sans-serif"],
    },
    extend: {
      gridTemplateRows: {
        "auto-1fr": "auto 1fr",
      },
    },
  },
  plugins: [],
};
