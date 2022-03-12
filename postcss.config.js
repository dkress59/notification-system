module.exports = {
	parser: 'postcss-scss',
	plugins: [
		require('postcss-import'),
		require('tailwindcss/nesting'),
		require('tailwindcss'),
		require('autoprefixer'),
	],
}
