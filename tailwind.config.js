module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        brand:"#8a2be2"
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
