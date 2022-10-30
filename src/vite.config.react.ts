import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, UserConfigExport } from 'vite'
import { coreConfig } from './vite.config.core'

const root = path.resolve(__dirname, 'react')

const reactConfig: UserConfigExport = {
	...coreConfig,
	root,
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: path.resolve(__dirname, 'react/index.ts'),
			name: 'multi-notification-system/react',
			// the proper extensions will be added
			fileName: 'index',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['react'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					react: 'React',
				},
			},
		},
		outDir: path.resolve(__dirname, '../dist/react'),
		target: 'es2015',
	},
	plugins: [react()],
}

export default defineConfig(reactConfig)
