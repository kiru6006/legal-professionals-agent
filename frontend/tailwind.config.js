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
        // Direct Global Design Tokens
        bg: "var(--color-bg)",
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          soft: "var(--color-primary-soft)",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--color-surface-muted)",
          foreground: "var(--color-text-primary)",
        },
        muted: {
          DEFAULT: "var(--color-surface-muted)",
          foreground: "var(--color-text-muted)",
        },
        accent: {
          DEFAULT: "var(--color-primary-soft)",
          foreground: "var(--color-text-primary)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          soft: "#EAF2ED",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          soft: "#F8F3EA",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          soft: "#FAEDEE",
        },
        info: {
          DEFAULT: "var(--color-info)",
          soft: "#EDF2F7",
        },
        // Typography color tokens
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        // Shadcn tokens mapped into the design token system
        background: "var(--color-bg)",
        foreground: "var(--color-text-primary)",
        card: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text-primary)",
        },
        popover: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text-primary)",
        },
        input: "var(--color-border)",
        ring: "var(--color-primary)",
        destructive: {
          DEFAULT: "var(--color-danger)",
          foreground: "#FFFFFF",
        },
        // Legacy navy tokens mapped to dark neutral
        navy: {
          900: "var(--color-primary)",
          800: "#222222",
          700: "#333333",
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        editorial: ['Newsreader', 'Georgia', 'serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
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
