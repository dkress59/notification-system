module.exports = {
	content: [
		'./src/*.{css,html,scss,ts,tsx}',
		'./src/**/*.{css,html,scss,ts,tsx}',
	],
	theme: {
		colors: {
			white: '#ffffff',
			black: '#2b2b2b',
			grey: '#505050',
			green: {
				default: '#14c0a0',
				light: '#e1f8f2',
			},
			blue: {
				default: '#0087cc',
				light: '#e1f2f9',
			},
			red: {
				default: '#f0264d',
				light: '#fdeaee',
			},
			yellow: {
				default: '#ffa800',
				light: '#fff6e5',
			},
		},
		extend: {
			maxWidth: {
				'1/2': '50%',
			},
			minWidth: {
				60: '240px',
			},
		},
	},
	plugins: [],
}
