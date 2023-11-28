/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/*.pug"],
	theme: {
		fontFamily: {
			sans: ["Poppins", "sans-serif"],
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
