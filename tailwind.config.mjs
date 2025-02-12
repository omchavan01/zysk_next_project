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
        "light-gray": "#EEEEEE",
        "custom-white": "FFFFFF",
      },
      minHeight: {
        1: "1px",
        56: "56px",
        72: "72px",
        "60vh": "60vh",
      },
    },
  },
  plugins: [],
};
