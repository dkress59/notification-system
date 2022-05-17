import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import * as webpack from 'webpack'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports
import * as webpackDevServer from 'webpack-dev-server'

interface WebpackEnv {
	WEBPACK_BUNDLE: boolean
	WEBPACK_BUILD: boolean
	mode?: 'development' | 'production'
}

export default function webpackConfig(
	_env: WebpackEnv,
	argv: WebpackEnv,
): webpack.Configuration {
	const isProduction = argv.mode === 'production'
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

		output: isProduction
			? {
					path: path.resolve(__dirname, 'build'),
					publicPath: '',
					filename: 'bundle.js',
			  }
			: undefined,

		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: 'src/demo.html',
				filename: 'index.html',
			}),
		],
	}
}
