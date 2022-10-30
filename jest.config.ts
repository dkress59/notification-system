import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'

const mappedModuleNames = pathsToModuleNameMapper(
	{
		':core/*': ['core/src/*'],
		':react/*': ['react/src/*'],
	},
	{
		prefix: '<rootDir>/',
	},
)

export default (): JestConfigWithTsJest => ({
	cacheDirectory: '.jest/cache',
	collectCoverage: true,
	collectCoverageFrom: ['**/src/**/*.(ts|tsx)'],
	modulePathIgnorePatterns: ['.d.ts', 'demo-app'],
	moduleNameMapper: {
		...mappedModuleNames,
		'\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/sassMock.js',
	},
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	testEnvironment: 'jsdom',
})
