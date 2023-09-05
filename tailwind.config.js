/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			transitionProperty: {
				"max-height": "max-height",
			},
			margin: {
				content: "298px",
			},
		},
		colors: {
			primary: {
				50: "#eff7ff",
				100: "#dbedfe",
				200: "#bfe0fe",
				300: "#93cefd",
				400: "#60b2fa",
				500: "#2288FF",
				600: "#1e6feb",
				700: "#1c5dd9",
				800: "#1e4caf",
				900: "#1e438a",
				950: "#172a54",
			},
			green: {
				50: "#f4fcf1",
				100: "#e3fade",
				200: "#c8f4be",
				300: "#9bea8b",
				400: "#69d652",
				500: "#44bf2b",
				600: "#329c1d",
				700: "#2b7a1b",
				800: "#25611a",
				900: "#1f5017",
				950: "#0c2c07",
			},
			orange: {
				50: "#fbf7eb",
				100: "#f6eacb",
				200: "#efd399",
				300: "#e3ad4f",
				400: "#dc9733",
				500: "#cd8125",
				600: "#b0631e",
				700: "#8d471b",
				800: "#763a1d",
				900: "#65311e",
				950: "#3a180e",
			},
			default: {
				background: "#F4F4F4",
				text: "#535353",
				white: "#FFFFFF",
				black: "#000000",
			},
		},
	},
	plugins: [],
};
