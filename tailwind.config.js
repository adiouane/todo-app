/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8'
        },
        background: {
          light: '#ffffff',
          dark: '#121212'
        },
        text: {
          light: '#333333',
          dark: '#f3f4f6'
        }
      }
    },
  },
  plugins: [],
}
