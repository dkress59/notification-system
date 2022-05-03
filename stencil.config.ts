import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
	namespace: 'notification-system',
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
			baseUrl: '.',
			serviceWorker: null, // disable service workers
		},
	],
	plugins: [
		sass({
			injectGlobalPaths: ['src/custom.scss', 'src/global.scss'],
		}),
	],
}
