/* eslint-disable @typescript-eslint/no-var-requires */

const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  darkMode: ['class'],
  theme: {
    fontFamily: {
      Hanken: ['Hanken Grotesk', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        btn: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
        custom: '0 4px 13px rgb(0 0 0 / 5%)',
      },
      colors: {
        primary: {
          light: '#81d9f9',
          DEFAULT: '#40c2f3',
          dark: '#006387',
        },
        secondary: '#0f392e',
        dark: {
          primary: '#141414',
          secondary: '#1D1D1D',
          'light-text': '#919191',
        },
        'dark-text': '#222222',
        'light-text': '#666666',
        grey: '#E7E7E7',
        lightBg: '#f4f7fa',
        darkBg: '#0e0e0e',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      },
    },
  },
  plugins: [
    animate,
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
