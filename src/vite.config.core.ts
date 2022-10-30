import path from 'path'
import { defineConfig } from 'vite'

const root = path.resolve(__dirname, 'core')

export default defineConfig({
	server: {
		root,
		open: true,
	},
})
