/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust for your file types and structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
