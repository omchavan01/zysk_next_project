/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      inter: "inter",
    },
    extend: {
      colors: {
        // Light mode colors
        "light-orange": "#E85C3F",
        "dark-orange": "#D54E34",
        // Dark mode colors
        "dark-bg": "#1a202c",
        "dark-text": "#a0aec0",
        "dark-light-orange": "#FF7F50",
        "dark-dark-orange": "#FF4500",
      },
      minHeight: {
        56: "56px",
        72: "72px",
        "60vh": "60vh",
      },
    },
  },
  plugins: [],
};
