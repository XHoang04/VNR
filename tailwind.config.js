/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'do': '#C0392B',
        'do-dam': '#922B21',
        'vang': '#F39C12',
        'xanh-la': '#27AE60',
        'xanh-duong': '#2980B9',
        'kem': '#FEF9E7',
        'cam': '#E67E22',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['Palatino', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
