/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        canvas: '#FBF8F2',
        warm: '#EBE3D7',
        sand: '#DED2C0',
        clay: '#C8B49A',
        espresso: '#2B2118',
        ink: '#1A1510',
        sage: '#A8AE96',
        moss: '#6F7558',
        bark: '#5C4A36',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.32em',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        firm: 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      maxWidth: {
        shell: '1320px',
      },
    },
  },
  plugins: [],
}
