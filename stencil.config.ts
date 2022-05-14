import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
	namespace: 'notification-system',
	plugins: [
		sass({
			injectGlobalPaths: ['src/css/global.scss', 'src/css/utils.scss'],
		}),
	],
	testing: {
		cacheDirectory: '.jest/cache',
		collectCoverage: true,
		collectCoverageFrom: ['src/**/*.{ts,tsx}'],
	},
}
