module.exports = {
	bracketSameLine: true,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	tailwindConfig: './tailwind.config.js',
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	semi: true,
};
