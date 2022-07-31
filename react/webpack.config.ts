import 'webpack-dev-server'

import fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import * as webpack from 'webpack'

interface WebpackArgv {
	env: {
		WEBPACK_BUNDLE: boolean
		WEBPACK_BUILD: boolean
		WEBPACK_SERVE: boolean
	}
	mode?: 'development' | 'production'
}

interface WebpackEnv {
	WEBPACK_BUNDLE: boolean
	WEBPACK_BUILD: boolean
	WEBPACK_SERVE: boolean
}

export default function webpackConfig(
	_env: WebpackEnv,
	argv: WebpackArgv,
): webpack.Configuration {
	const isProduction = argv.mode === 'production'
	const isBuild = !argv.env.WEBPACK_SERVE
	const coreBundleExists = fs.existsSync(
		path.resolve(__dirname, '..', 'dist', 'bundle.js'),
	)
	if (!coreBundleExists)
		throw new Error(
			'The core bundle was not found. Run `yarn workspace core build` to fix this problem.',
		)

	return {
		devServer: {
			compress: false,
			allowedHosts: ['127.0.0.1', 'localhost'],
			historyApiFallback: {
				disableDotRule: true,
				index: '/',
			},
			hot: true,
			port: process.env.PORT ?? 3000,
			static: path.resolve(__dirname, '..', 'dist'),
		},

		devtool: isProduction ? false : 'inline-source-map',

		entry: path.resolve(__dirname, 'src', 'demo-app.tsx'),

		mode: isProduction ? 'production' : 'development',

		module: {
			rules: [
				{
					test: /\.(t|j)sx?$/i,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			alias: {
				':core': path.resolve(__dirname, '..', 'core', 'src'),
				':react': path.resolve(__dirname, '..', 'react', 'src'),
			},
			extensions: ['.tsx', '.ts', '.js'],
		},

		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},

		output: isBuild
			? {
					path: path.resolve(__dirname, '..', 'dist', 'react'),
					filename: 'static/[name].[contenthash].js',
			  }
			: undefined,

		plugins: [
			new HtmlWebpackPlugin({
				favicon: false,
				filename: 'index.html',
				inject: true,
				minify: false,
				template: path.resolve(__dirname, 'src', 'index.html'),
				xhtml: true,
			}),
		],
	}
}
