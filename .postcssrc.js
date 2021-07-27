let tailwindcss = require('tailwindcss');
let autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		tailwindcss('./tailwind.js'),
		autoprefixer(),
	]
}