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
				normal: "#166ef4",
				normal_hover: "#1463dc",
			},
			gray: {
				light: "#EBEBEB",
				normal: "#E4E4E4",
				darker: "#515151",
			},
			white: "#FFFFFF",
			black: "#000000",
		},
	},
	plugins: [],
};
