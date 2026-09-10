/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0C',
        charcoal: '#16161B',
        border: '#26262E',
        mint: '#10B981',
        gold: '#F59E0B',
        ink: '#F4F4F5',
        muted: '#A1A1AA',
        locked: '#3F3F46',
      },
      fontFamily: {
        sans: ['System'],
      },
      letterSpacing: {
        badge: '0.08em',
      },
    },
  },
  plugins: [],
};
