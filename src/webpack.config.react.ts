import 'webpack-dev-server'

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
		},

		devtool: isProduction ? false : 'inline-source-map',

		entry: !isBuild
			? [
					path.resolve(__dirname, 'react', 'index.ts'),
					path.resolve(__dirname, 'react', 'demo-app.tsx'),
			  ]
			: {
					'core/index': path.resolve(__dirname, 'core/index.ts'),
					'react/index': path.resolve(__dirname, 'react/index.ts'),
			  },

		mode: isProduction ? 'production' : 'development',

		module: {
			rules: [
				{
					test: /\.s?css?$/i,
					use: ['style-loader', 'css-loader', 'sass-loader'],
					exclude: /node_modules/,
				},
				{
					test: /\.(t|j)sx?$/i,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},

		resolve: {
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
					path: path.resolve(__dirname, '..', 'dist'),
					//filename: 'static/[name].[contenthash].js',
			  }
			: undefined,

		plugins: !isBuild
			? [
					new HtmlWebpackPlugin({
						favicon: false,
						filename: 'index.html',
						inject: true,
						minify: false,
						template: path.resolve(__dirname, 'react', 'demo.html'),
						xhtml: true,
					}),
			  ]
			: [],
	}
}
