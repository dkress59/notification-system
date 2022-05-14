import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
	namespace: 'notification-system',
	plugins: [
		sass({
			injectGlobalPaths: ['src/css/custom.scss', 'src/css/global.scss'],
		}),
	],
	testing: {
		cacheDirectory: '.jest/cache',
		collectCoverage: true,
		collectCoverageFrom: ['src/**/*.{ts,tsx}'],
	},
}
