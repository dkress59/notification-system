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
		'@typescript-eslint/no-empty-function': 'off',
		'curly': 'off',
		'jam3/no-sanitizer-with-danger': 2,
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				varsIgnorePattern: '^h$',
				args: 'after-used',
				argsIgnorePattern: '^h$',
			},
		],
		'eslint-comments/disable-enable-pair': 'off',
		'jsx-a11y/no-noninteractive-element-interactions': 1,
		'jsx-a11y/no-noninteractive-element-to-interactive-role': 1,
	},
}
