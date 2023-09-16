const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      colors: {
        lightPrimary: "#22c55e", // green-500
        lightSecondary: "#16a34a", // green-600
        lightHover: "#1cb454", // green-550
        darkPrimary: "#0a0a0a", // neutral-950
        darkSecondary: "#404040", // neutral-700
        darkHover: "#262626", // neutral-800
        green: {
          550: "#1cb454",
        },
      },
      height: {
        30: "7.5rem",
      },
      maxHeight: {
        "5/6": "83.333333%",
      },
    },
    screens: {
      xxs: "320px",
      xs: "475px",
      desktop: "768px",
      ...defaultTheme.screens,
    },
    keyframes: {
      slideUpAndFade: {
        from: { opacity: 0, transform: "translateY(2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideRightAndFade: {
        from: { opacity: 0, transform: "translateX(-2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      slideDownAndFade: {
        from: { opacity: 0, transform: "translateY(-2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        from: { opacity: 0, transform: "translateX(2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      tooltipSlideUpAndFade: {
        from: { opacity: 0, transform: "translateY(2px)" },
        to: { opacity: 0.9, transform: "translateY(0)" },
      },
      tooltiplideRightAndFade: {
        from: { opacity: 0, transform: "translateX(-2px)" },
        to: { opacity: 0.9, transform: "translateX(0)" },
      },
      tooltiplideDownAndFade: {
        from: { opacity: 0, transform: "translateY(-2px)" },
        to: { opacity: 0.9, transform: "translateY(0)" },
      },
      tooltiplideLeftAndFade: {
        from: { opacity: 0, transform: "translateX(2px)" },
        to: { opacity: 0.9, transform: "translateX(0)" },
      },
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 0.4 },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
      scale: {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(0.95)" },
        "100%": { transform: "scale(1)" },
      },
    },
    animation: {
      slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideRightAndFade:
        "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      scale: "scale 200ms ease-out",
    },
  },
  darkMode: "class",
  plugins: [],
}
