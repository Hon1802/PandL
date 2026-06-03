/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', '"Allura"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        twinkle: {
          '0%,100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sheen: 'sheen 4s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        slowSpin: 'slowSpin 60s linear infinite',
      },
      boxShadow: {
        'soft-xl': '0 30px 80px -20px rgba(0,0,0,0.35)',
        'inner-glow': 'inset 0 0 60px rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};
