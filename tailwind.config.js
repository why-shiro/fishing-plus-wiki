import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc[700]'),
            '--tw-prose-headings': theme('colors.zinc[900]'),
            '--tw-prose-lead': theme('colors.zinc[700]'),
            '--tw-prose-links': theme('colors.brand[600]'),
            '--tw-prose-bold': theme('colors.zinc[900]'),
            '--tw-prose-counters': theme('colors.zinc[500]'),
            '--tw-prose-bullets': theme('colors.zinc[400]'),
            '--tw-prose-hr': theme('colors.zinc[200]'),
            '--tw-prose-quotes': theme('colors.zinc[900]'),
            '--tw-prose-quote-borders': theme('colors.brand[300]'),
            '--tw-prose-captions': theme('colors.zinc[500]'),
            '--tw-prose-code': theme('colors.zinc[900]'),
            '--tw-prose-pre-code': theme('colors.zinc[100]'),
            '--tw-prose-pre-bg': theme('colors.zinc[900]'),
            '--tw-prose-th-borders': theme('colors.zinc[300]'),
            '--tw-prose-td-borders': theme('colors.zinc[200]'),
            '--tw-prose-invert-body': theme('colors.zinc[300]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.brand[400]'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.zinc[400]'),
            '--tw-prose-invert-bullets': theme('colors.zinc[600]'),
            '--tw-prose-invert-hr': theme('colors.zinc[800]'),
            '--tw-prose-invert-quotes': theme('colors.zinc[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.brand[700]'),
            '--tw-prose-invert-captions': theme('colors.zinc[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.zinc[300]'),
            '--tw-prose-invert-pre-bg': theme('colors.zinc[950]'),
            '--tw-prose-invert-th-borders': theme('colors.zinc[700]'),
            '--tw-prose-invert-td-borders': theme('colors.zinc[800]'),
            maxWidth: 'none',
            a: { textDecoration: 'none', fontWeight: '500' },
            'a:hover': { textDecoration: 'underline' },
            code: {
              fontWeight: '500',
              backgroundColor: theme('colors.zinc[100]'),
              padding: '0.15rem 0.35rem',
              borderRadius: '0.3rem'
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              borderRadius: '0.6rem',
              border: `1px solid ${theme('colors.zinc[800]')}`
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0'
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '400',
              borderLeftWidth: '3px',
              backgroundColor: theme('colors.brand[50]'),
              padding: '0.5rem 1rem',
              borderRadius: '0 0.4rem 0.4rem 0'
            },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
            table: { fontSize: '0.95rem' },
            'thead th': {
              backgroundColor: theme('colors.zinc[50]'),
              fontWeight: '600'
            }
          }
        },
        invert: {
          css: {
            code: {
              backgroundColor: theme('colors.zinc[800]')
            },
            blockquote: {
              backgroundColor: theme('colors.zinc[900]')
            },
            'thead th': {
              backgroundColor: theme('colors.zinc[900]')
            }
          }
        }
      })
    }
  },
  plugins: [typography]
}
