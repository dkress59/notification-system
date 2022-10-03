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
					'core/components/banner-area/banner-area': path.resolve(
						__dirname,
						'core',
						'components',
						'banner-area',
						'banner-area.ts',
					),
					'core/components/banner-notification/banner-notification':
						path.resolve(
							__dirname,
							'core',
							'components',
							'banner-notification',
							'banner-notification.ts',
						),
					'core/components/modal-notification/modal-notification':
						path.resolve(
							__dirname,
							'core',
							'components',
							'modal-notification',
							'modal-notification.ts',
						),
					'core/components/notification-area/notification-area':
						path.resolve(
							__dirname,
							'core',
							'components',
							'notification-area',
							'notification-area.ts',
						),
					'core/components/toast-notification/toast-notification':
						path.resolve(
							__dirname,
							'core',
							'components',
							'toast-notification',
							'toast-notification.ts',
						),

					/* 'react/components/banner-area': path.resolve(
						__dirname,
						'react',
						'components',
						'banner-area.tsx',
					),
					'react/components/banner-notification': path.resolve(
						__dirname,
						'react',
						'components',
						'banner-notification.tsx',
					),
					'react/components/modal-notification': path.resolve(
						__dirname,
						'react',
						'components',
						'modal-notification.tsx',
					),
					'react/components/notification-area': path.resolve(
						__dirname,
						'react',
						'components',
						'notification-area.tsx',
					),
					'react/components/toast-notification': path.resolve(
						__dirname,
						'react',
						'components',
						'toast-notification.tsx',
					), */
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
