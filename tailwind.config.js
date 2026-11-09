/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twilight: {
          950: '#070a13',
          900: '#0f172a',
          800: '#1e293b',
          amber: '#f59e0b',
          sunset: '#f97316',
          dusk: '#ec4899',
          purple: '#6366f1',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      animation: {
        'petal-drift': 'petalDrift 10s linear infinite',
        'firefly': 'fireflyFloat 4s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        petalDrift: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translate(-400px, 350px) rotate(360deg)', opacity: '0' },
        },
        fireflyFloat: {
          '0%': { transform: 'translate(0, 0) scale(0.8)', opacity: '0.3' },
          '50%': { transform: 'translate(15px, -20px) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translate(-10px, -35px) scale(0.9)', opacity: '0.4' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
