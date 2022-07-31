module.exports = {
	root: true,
	env: {
		browser: true,
		jest: true,
	},
	extends: ['@tool-belt/eslint-config'],
	ignorePatterns: [
		'**/.eslintrc.js',
		'**/coverage/*',
		'**/build/*',
		'**/dist/*',
	],
	parserOptions: {
		project: ['./tsconfig.json'],
	},
	plugins: ['jam3', 'jsx-a11y', 'unused-imports'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	rules: {
		'curly': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': 'error',
	},
}
