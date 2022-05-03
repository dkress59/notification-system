module.exports = {
	content: ['./src/*.{css,html,ts,tsx}', './src/**/*.{css,html,ts,tsx}'],
	theme: {
		colors: {
			white: '#ffffff',
			black: '#2b2b2b',
			grey: '#505050',
			green: {
				DEFAULT: '#14c0a0',
				light: '#e1f8f2',
			},
			blue: {
				DEFAULT: '#0087cc',
				light: '#e1f2f9',
			},
			red: {
				DEFAULT: '#f0264d',
				light: '#fdeaee',
			},
			yellow: {
				DEFAULT: '#ffa800',
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
