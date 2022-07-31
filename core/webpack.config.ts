import 'webpack-dev-server'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
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
			port: process.env.PORT ?? 3000,
		},

		devtool: isProduction ? false : 'inline-source-map',

		entry: './src/index.ts',

		mode: isProduction ? 'production' : 'development',

		module: {
			rules: [
				{
					test: /\.s?css?$/i,
					use: ['css-loader', 'sass-loader'],
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

		output: isBuild
			? {
					path: path.resolve(__dirname, '..', 'dist'),
					publicPath: '',
					filename: 'bundle.js',
			  }
			: undefined,
		plugins: [
			new CleanWebpackPlugin(),
			isProduction
				? () => null
				: new HtmlWebpackPlugin({
						template: 'src/demo.html',
						filename: 'index.html',
				  }),
		],
	}
}
