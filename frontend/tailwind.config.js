/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          gray: {
            950: '#0a0a0a',
            900: '#111827',
            800: '#1f2937',
            700: '#374151',
            600: '#4b5563',
            500: '#6b7280',
            400: '#9ca3af',
            300: '#d1d5db',
            200: '#e5e7eb',
            100: '#f3f4f6',
          },
        },
      },
    },
    plugins: [],
  }