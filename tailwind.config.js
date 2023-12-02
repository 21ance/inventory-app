/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/*.pug"],
	theme: {
		fontFamily: {
			sans: ["Poppins", "sans-serif"],
		},
		gridTemplateColumns: {
			list: "repeat(auto-fill, minmax(225px, 1fr))",
			list_mini: "repeat(auto-fill, minmax(130px, 1fr))",
		},
		extend: {},
	},
	plugins: [
		{
			tailwindcss: {},
			autoprefixer: {},
		},
	],
};
