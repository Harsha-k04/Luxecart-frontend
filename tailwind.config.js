/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                background: "#0b0f19",
                foreground: "#ffffff",
                card: "#111827",
                border: "#1f2937",
                primary: "#c9a86a",
                secondary: "#1e293b",
                muted: "#9ca3af",
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};