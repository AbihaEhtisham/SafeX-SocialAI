import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        safex: {
          primary: '#14438e',
          accent: '#20bef6',
          secondary: '#235bcc',
          surface: '#1b7fd2',
          dark: '#363738',
          light: '#f0f4ff',
          card: '#ffffff',
          glow: 'rgba(32, 190, 246, 0.25)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'count-up': 'countUp 0.8s ease-out',
        'ai-thinking': 'aiThinking 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(32, 190, 246, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(32, 190, 246, 0.4)' },
        },
        aiThinking: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(32, 190, 246, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(32, 190, 246, 0.15)',
        'glow': '0 0 30px rgba(32, 190, 246, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;