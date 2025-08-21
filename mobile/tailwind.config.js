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
        "tinos-bold": ["Tinos-Bold", "sans-serif"],
        "rubik": ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"]

      },
       colors:{
        primary: {
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
        secondary: "#F5F5F7",
        tertiary: "#EEEEEE",
        accent:{
          100: "#FBFBFD"
        },
        white: "#FFFFFF",
        black:{
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191d31",
        },
        danger: "#F75555",
         gray: {
            50: "#FAFAFA",
            100: "#F4F4F5",
            200: "#E4E4E7",
            300: "#D4D4D8",
            400: "#A1A1AA",
            500: "#71717A",
            600: "#52525B",
            700: "#3F3F46",
            800: "#27272A",
            900: "#18181B",
        },
      },
    },
  },
  plugins: [],
}