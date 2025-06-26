export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f6ff",
          100: "#dbe8ff",
          200: "#b7d1ff",
          300: "#8fbbff",
          400: "#5d9dff",
          500: "#2a7fff",
          600: "#0062ff",
          700: "#0054e0",
          800: "#0044b3",
          900: "#003486"
        },
        accent: {
          400: "#ffa84d",
          500: "#ff8a00",
          600: "#e57500"
        }
      }
    },
  },
  plugins: [],
}
