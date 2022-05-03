import { Config } from '@stencil/core'
//import { postcss } from '@stencil/postcss' // Required for tailwind 2.x
//import tailwind from 'tailwindcss' // Required for tailwind 2.x
import stencilTailwind from 'stencil-tailwind'
import tailwindcss from 'tailwindcss'

export const config: Config = {
	namespace: 'notification-system',
	devServer: {
		reloadStrategy: 'pageReload',
	},
	outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: '../loader',
		},
		{
			type: 'dist-custom-elements',
		},
		{
			type: 'docs-readme',
		},
		{
			type: 'www',
			serviceWorker: null, // disable service workers
		},
	],
	plugins: [
		/* postcss({
			injectGlobalPaths: ['src/app.scss'],
			// Required for tailwind 2.x
			plugins: [
				require('postcss-import'), // Required for tailwind 2.x
				require('tailwindcss/nesting'),
				require('tailwindcss'),
				require('autoprefixer'),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				tailwind('./tailwind.config.js'), // Required for tailwind 2.x
			],
		}), */
		stencilTailwind({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
			tailwind: tailwindcss('./tailwind.config.js'),
			//inputFile: './src/css/utils.scss',
		}),
	],
}
