import { Config } from '@stencil/core'

import { config as stencilConfig } from './stencil.config'

export const config: Config = {
	tsconfig: './tsconfig.build.json',
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
	...stencilConfig,
}
