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
			serviceWorker: null,
		},
	],
	plugins: [
		sass({
			injectGlobalPaths: ['src/css/custom.scss', 'src/css/global.scss'],
		}),
	],
}
