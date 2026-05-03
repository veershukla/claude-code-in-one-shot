/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-elevated': '#1a1a1a',
        text: {
          primary: '#e2e8f0',
          muted: '#94a3b8',
        },
        accent: {
          DEFAULT: '#00ff88',
          dim: '#00cc6a',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
