/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Google Core Colors
        google: {
          blue: "var(--google-blue)",
          "blue-strong": "var(--google-blue-strong)",
          red: "var(--google-red)",
          "red-dark": "var(--google-red-dark)",
          yellow: "var(--google-yellow)",
          green: "var(--google-green)",
          "green-dark": "var(--google-green-dark)",
        },
        // Extended Palette
        palette: {
          purple: "var(--color-purple)",
          "purple-dark": "var(--color-purple-dark)",
          indigo: "var(--color-indigo)",
          cyan: "var(--color-cyan)",
          orange: "var(--color-orange)",
          pink: "var(--color-pink)",
          teal: "var(--color-teal)",
          lime: "var(--color-lime)",
        },
        // Vignxs Brand Crimson
        vignxs: {
          crimson: "var(--vignxs-crimson)",
          "crimson-deep": "var(--vignxs-crimson-deep)",
          rose: "var(--vignxs-rose)",
          "rose-soft": "var(--vignxs-rose-soft)",
          "pink-light": "var(--vignxs-pink-light)",
          hover: "var(--vignxs-hover)",
          selected: "var(--vignxs-selected)",
          soft: "var(--vignxs-soft)",
        },
        // Semantic Soft Backgrounds
        soft: {
          primary: "var(--semantic-primary-soft)",
          success: "var(--semantic-success-soft)",
          error: "var(--semantic-error-soft)",
          warning: "var(--semantic-warning-soft)",
          ai: "var(--semantic-ai-soft)",
          info: "var(--semantic-info-soft)",
          brand: "var(--semantic-brand-soft)",
          neutral: "var(--semantic-neutral-soft)",
        },
        // System Neutrals
        app: {
          bg: "var(--color-bg-main)",
          surface: "var(--color-surface-white)",
          muted: "var(--color-surface-muted)",
          dark: "var(--color-surface-dark)",
          code: "var(--color-code-bg)",
          border: "var(--color-border)",
          "border-strong": "var(--color-border-strong)",
          "row-border": "var(--color-table-row-border)",
          text: "var(--color-text-primary)",
          "text-secondary": "var(--color-text-secondary)",
          "text-muted": "var(--color-text-muted)",
        },
        // Mapped Shadcn Tokens
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ['Inter', 'Google Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        editorial: ['Newsreader', 'Georgia', 'serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(60, 64, 67, 0.08), 0 1px 2px 0 rgba(60, 64, 67, 0.04)',
        'card-hover': '0 4px 12px 0 rgba(60, 64, 67, 0.12), 0 1px 3px 0 rgba(60, 64, 67, 0.08)',
        'table-row': '0 1px 3px 0 rgba(60, 64, 67, 0.06)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
