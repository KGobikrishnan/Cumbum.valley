/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#082c1b',
          light: '#1f5738',
          medium: '#113f27',
        },
        gold: {
          DEFAULT: '#c39c4e',
          hover: '#b08736',
          light: '#f5edd8',
        },
        cream: {
          DEFAULT: '#fbf9f4',
          darker: '#f3f0e5',
        },
        charcoal: '#1c2721',
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
