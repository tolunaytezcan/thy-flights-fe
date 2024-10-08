import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [
		react(),
		eslintPlugin({
			cache: false,
			include: ['./src//*.js', './src//*.jsx'],
			exclude: [],
		}),
	],
	resolve: {
		alias: {
			'@App': path.resolve(__dirname, './src/'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/styles/variables.scss";`,
			},
		},
	},
});
