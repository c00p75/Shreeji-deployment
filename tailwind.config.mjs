/** @type {import('tailwindcss').Config} */
export default {
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
        primary: {
          50: '#f5f3ef',
          100: '#ede5cf',
          200: '#dfdbcf',
          300: '#c9bea8',
          400: '#b3a580',
          500: '#807045',
          600: '#6b5d3a',
          700: '#564a2f',
          800: '#423824',
          900: '#2d2518',
        },
        secondary: {
          50: '#faf9f7',
          100: '#ede5cf',
          200: '#dfdbcf',
          300: '#d1cbb0',
          400: '#c3ba91',
          500: '#ede5cf',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
};
