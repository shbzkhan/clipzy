/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       fontFamily:{
        "cormorantgaramond": ["CormorantGaramond-Regular", "sans-serif"],
        "cormorantgaramond-medium": ["CormorantGaramond-Medium", "sans-serif"],
        "tinos": ["Tinos-Regular", "sans-serif"],
        "tinos-bold": ["Tinos-Bold", "sans-serif"]

      },
       colors:{
        "primary": {
           50: "#EBF5FF",
          100: "#DBEAFE",
          200: "#BEDBEF",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82FE",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        accent:{
          100: "#FBFBFD"
        },
        black:{
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191d31",
        },
        danger: "#F75555",
      }
    },
  },
  plugins: [],
}