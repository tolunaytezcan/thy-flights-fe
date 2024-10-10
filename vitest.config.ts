// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { join } from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@App': join(__dirname, 'src'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './vitest.setup.ts',
	},
});
