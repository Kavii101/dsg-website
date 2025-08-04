import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'android-sm': '360px',
        'android-md': '393px', 
        'android-lg': '412px',
        'android-xl': '768px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dsg: {
          blue: {
            50: '#e6f3fb',
            100: '#cce7f7',
            200: '#99cfef',
            300: '#66b8e6',
            400: '#33a0de',
            500: '#0099CC',
            600: '#007aa3',
            700: '#005c7a',
            800: '#003d52',
            900: '#001f29',
          },
          pink: {
            50: '#fce4ec',
            100: '#f9c9d9',
            200: '#f392b3',
            300: '#ed5c8c',
            400: '#e72566',
            500: '#E91E63',
            600: '#ba184f',
            700: '#8c123b',
            800: '#5d0c28',
            900: '#2f0614',
          },
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      spacing: {
        'unit': '0.25rem',
        'xs': 'calc(0.25rem * 2)',
        'sm': 'calc(0.25rem * 4)',
        'md': 'calc(0.25rem * 6)',
        'lg': 'calc(0.25rem * 8)',
        'xl': 'calc(0.25rem * 12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;