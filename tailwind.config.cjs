/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 10s ease-in-out",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },

      keyframes: (theme) => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "15%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shake: {
          "10%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "50%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%": {
            transform: "translate3d(4px, 0, 0)",
          },
          "60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      }),

      colors: {
        primary: "#f8e0b0",
        green: "#24a16d",
        lightgreen: "#8ddc79",
        lavender: "#886bd6",
        red: "#b94242",
        orange: "#e7ac3e",
        background: "#292b2f",
        foreground: "#36393f",
      },
    },
  },
  plugins: [],
};
