/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#16213A', paper: '#EEF2F5', en: '#2B5FD9', fr: '#C8344A' },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
