/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dungeon: {
          wall: '#4a5568',
          floor: '#e2e8f0',
          door: '#8b5cf6',
          room: '#f7fafc',
          corridor: '#cbd5e0',
          treasure: '#f6ad55',
          monster: '#e53e3e',
          trap: '#fc8181',
        }
      }
    },
  },
  plugins: [],
}