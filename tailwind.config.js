/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeUp: { "0%": { opacity: 0, transform: "translateY(20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeDown: { "0%": { opacity: 0, transform: "translateY(-20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeLeft: { "0%": { opacity: 0, transform: "translateX(-20px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        fadeRight: { "0%": { opacity: 0, transform: "translateX(20px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        "fade-up": "fadeUp 1s ease-out",
        "fade-down": "fadeDown 1s ease-out",
        "fade-left": "fadeLeft 1s ease-out",
        "fade-right": "fadeRight 1s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    }
    ,
  },
  plugins: [],
}