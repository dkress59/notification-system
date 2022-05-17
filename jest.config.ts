import type { Config } from '@jest/types'

export default (): Config.InitialOptions => ({
	cacheDirectory: '.jest/cache',
	collectCoverage: true,
	collectCoverageFrom: ['**/src/**/*.(ts|tsx)'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/sassMock.js',
	},
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'esbuild-jest',
	},
	transformIgnorePatterns: [
		'\\.yarn/cache/(?!texsaur)',
		'node_modules/(?!texsaur)',
	],
})
