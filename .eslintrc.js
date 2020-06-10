module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-tabs': 0,
		indent: 0,
		'prettier/prettier': [
			'warn',
			{
				'#': 'prettier config in here :)',
				singleQuote: true,
				semi: true,
				trailingComma: 'none',
				tabWidth: 4,
				useTabs: true
			}
		]
	}
};
