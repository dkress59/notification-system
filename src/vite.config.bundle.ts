import path from 'path'
import { defineConfig, UserConfigExport } from 'vite'
import { coreConfig } from './vite.config.core'

const bundleConfig: UserConfigExport = {
	...coreConfig,
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: path.resolve(__dirname, 'core/index.ts'),
			name: 'multi-notification-system',
			// the proper extensions will be added
			fileName: 'bundle',
		},
		outDir: path.resolve(__dirname, '../dist'),
		target: 'modules',
	},
}

export default defineConfig(bundleConfig)
