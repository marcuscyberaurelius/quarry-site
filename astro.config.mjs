// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://dd-quarry.example',
	output: 'static',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'sq'],
		routing: { prefixDefaultLocale: false },
	},
});
