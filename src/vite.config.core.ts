import path from 'path'
import fs from 'fs'
import { defineConfig, UserConfigExport } from 'vite'

const root = path.resolve(__dirname, 'core')
const dist = path.resolve(__dirname, '..', 'dist')
const bundle = path.resolve(dist, 'bundle.js')

export const coreConfig: UserConfigExport = {
	root,
	publicDir: fs.existsSync(bundle) ? dist : false,
	server: {
		open: true,
	},
	build: {
		cssCodeSplit: false,
		copyPublicDir: false,
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: path.resolve(__dirname, 'core/index.ts'),
			name: 'multi-notification-system',
			// the proper extensions will be added
			fileName: 'index',
		},
		outDir: path.resolve(__dirname, '../dist/core'),
		target: 'es2015',
	},
}

export default defineConfig(coreConfig)
