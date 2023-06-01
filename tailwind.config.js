/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,jsx,ts,tsx}",
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1a3954",
        secondary: " #e74c3c",
        dimWhite: "rgba(255, 255, 255, 0.9)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        login:
          "url('https://s3.brilliant.com.bd/tahsin/todo%2520app/login%20bg.png')",
        logo: "url('https://s3.brilliant.com.bd/tahsin/kheyaPortfolio/T-removebg-preview.png')",
      },
    },
    screens: {
      xxs: "200px",
      xs: "350px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
};
