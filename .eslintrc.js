module.exports = {
	root: true,
	env: {
		browser: true,
		jest: true,
	},
	extends: ['@tool-belt/eslint-config'],
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
		'eslint-comments/disable-enable-pair': 'off',
		'jam3/no-sanitizer-with-danger': 2,
		'jsx-a11y/no-noninteractive-element-interactions': 1,
		'jsx-a11y/no-noninteractive-element-to-interactive-role': 1,
		'react/jsx-no-bind': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				varsIgnorePattern: '^jsx$',
				args: 'after-used',
				argsIgnorePattern: '^jsx$',
			},
		],
	},
}
