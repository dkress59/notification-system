import { InitialOptionsTsJest } from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
	cacheDirectory: '.jest/cache',
	collectCoverageFrom: ['src/**/*.(ts|tsx)'],
	coveragePathIgnorePatterns: ['.config.ts', 'types.ts'],
	coverageReporters: ['lcov', 'text', 'cobertura'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: [`<rootDir>/tests/**/*.(spec|test).(ts|tsx)`],
	transform: { '\\.tsx?$': 'ts-jest' },
}

export default config
