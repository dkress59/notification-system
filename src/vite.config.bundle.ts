import path from 'path'
import { defineConfig, UserConfigFn } from 'vite'
import { getCoreConfig } from './vite.config.core'

const bundleConfig: UserConfigFn = args => ({
	...getCoreConfig(args),
	build: {
		// @ts-ignore
		...getCoreConfig(args).build,
		formats: ['es', 'cjs'],
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: path.resolve(__dirname, 'core/index.ts'),
			name: 'multi-notification-system',
			fileName: 'bundle',
		},
		outDir: path.resolve(__dirname, '../dist'),
		//target: 'modules',
	},
})

export default defineConfig(bundleConfig)
