import { InitialOptionsTsJest, pathsToModuleNameMapper } from 'ts-jest'

const mappedModuleNames = pathsToModuleNameMapper(
	{
		':core/*': ['core/src/*'],
		':react/*': ['react/src/*'],
	},
	{
		prefix: '<rootDir>/',
	},
)

export default (): InitialOptionsTsJest => ({
	cacheDirectory: '.jest/cache',
	collectCoverage: true,
	collectCoverageFrom: ['**/src/**/*[^d].(ts|tsx)'],
	moduleNameMapper: {
		...mappedModuleNames,
		'\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/sassMock.js',
	},
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	testEnvironment: 'jsdom',
})
