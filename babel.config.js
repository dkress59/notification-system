module.exports = {
	presets: [
		'@babel/preset-react',
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: '> 2%, edge >= 17',
				},
			},
		],
	],
	plugins: ['@babel/plugin-transform-runtime'],
}
