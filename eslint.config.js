import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			eslintConfigPrettier,
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			react: {
				version: '18.2',
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			camelcase: 'error',
			'spaced-comment': 'error',
			quotes: ['error', 'single', { avoidEscape: true }],
			'no-duplicate-imports': 'error',
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'linebreak-style': ['error', 'unix'],
			semi: ['error', 'always'],
			'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
			'func-style': [
				'error',
				'expression',
				{ allowArrowFunctions: true },
			],
			'import/no-unresolved': 0,
			'react/prop-types': 0,
			'no-console': 'error',
			'eqeqeq': 'error',
			'for-direction': 'error',
			'getter-return': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-constant-condition': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-dupe-args': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-empty': 'error',
			'no-empty-character-class': 'error',
			'no-extra-boolean-cast': 'error',
			'no-await-in-loop': 'error',
			'no-nested-ternary': 'error',
			'brace-style': ['error', '1tbs'],
			'semi-style': ['error', 'last'],
			'semi-spacing': ['error', { before: false, after: true }],
			'sort-imports': [
				'error',
				{ ignoreCase: true, ignoreDeclarationSort: true },
			],
		},
	},
);
