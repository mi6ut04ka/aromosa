/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brillant: ['var(--font-brillant)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif']
      },
    },
  },
  plugins: [],
  darkMode: false
};
