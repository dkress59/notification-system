import path from 'path'
import fs from 'fs'
import { defineConfig, UserConfigFn } from 'vite'

const root = path.resolve(__dirname, 'core')
const dist = path.resolve(__dirname, '..', 'dist')
const bundle = path.resolve(dist, 'bundle.js')

export const getCoreConfig: UserConfigFn = ({ command }) => ({
	appType: command === 'build' ? 'custom' : 'spa',
	cacheDir: path.resolve(__dirname, '..', '.yarn/.vite-cache'),
	root,
	publicDir: fs.existsSync(bundle) ? dist : false,
	server: {
		open: true,
	},
	build: {
		cssCodeSplit: false,
		copyPublicDir: false,
		formats: ['es', 'umd'],
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: path.resolve(__dirname, 'core/index.ts'),
			name: 'multi-notification-system',
			fileName: 'index',
		},
		outDir: path.resolve(__dirname, '../dist/core'),
	},
})

export default defineConfig(getCoreConfig)
