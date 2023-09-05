/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
