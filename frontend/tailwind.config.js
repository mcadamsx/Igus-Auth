/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {},
    colors:{
      PrimaryColor: "#202433",
      SecondaryColor: "#FC728B",
      TertiaryColor: "#33394F",
      White: "#FFFFFF",
    }
  },
  plugins: [],
}