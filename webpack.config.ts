import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import * as webpack from 'webpack'

interface WebpackArgv {
	WEBPACK_BUNDLE: boolean
	WEBPACK_BUILD: boolean
	mode?: 'development' | 'production'
}

const outDir = path.resolve(__dirname, `build`)

const devCss = ['style-loader', 'css-loader', 'postcss-loader']

const devPlugins = [
	// Re-generate index.html with injected script tag.
	// The injected script tag contains a src value of
	// config.output.filename
	new HtmlWebpackPlugin({
		inject: true,
		template: path.resolve(__dirname, `public/index.html`),
	}),
	new ESLintPlugin({
		emitWarning: false,
		exclude: ['.yarn', 'build', 'node_modules'],
		extensions: ['js', 'jsx', 'ts', 'tsx'],
	}),
] as webpack.WebpackPluginInstance[]

const buildCss = [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

const buildPlugins = [
	new HtmlWebpackPlugin({
		inject: true,
		template: path.resolve(__dirname, `public/index.html`),
		minify: true,
		filename: 'index.html',
		favicon: false,
		xhtml: true,
	}),
	new MiniCssExtractPlugin({
		filename: 'static/css/[name].[contenthash].css',
		chunkFilename: 'static/css/[name].[contenthash].css',
	}),
	new CopyPlugin({
		patterns: [
			{
				from: 'public/**/*',
				filter: resourcePath => !resourcePath.includes('index.html'),
				to: '[name][ext]',
			},
		],
	}),
	new ForkTsCheckerWebpackPlugin({
		async: false,
	}),
	new ESLintPlugin({
		exclude: ['.yarn', 'build', 'node_modules'],
		extensions: ['js', 'jsx', 'ts', 'tsx'],
	}),
	new CleanWebpackPlugin(),
] as webpack.WebpackPluginInstance[]

export default (_env: unknown, argv: WebpackArgv): webpack.Configuration => {
	const isProduction = argv.mode === 'production'

	return {
		devtool: isProduction ? false : 'source-map',
		entry: path.resolve(__dirname, `src/entry-point.tsx`),
		externalsPresets: isProduction ? { node: true } : undefined,
		mode: isProduction ? 'production' : 'development',
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/i,
					exclude: [
						/node_modules/,
						/stories\/[A-Za-z0-9-/]*.*\.tsx?$/,
					],
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript',
							],
						},
					},
				},
				{
					test: /\.(?:c|sa|sc)ss$/,
					use: isProduction ? buildCss : devCss,
				},
			],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
						filename: 'vendors.[contenthash].js',
					},
				},
			},
		},
		output: isProduction
			? {
					path: outDir,
					filename: 'static/js/[name].[contenthash].js',
					publicPath: '/',
			  }
			: undefined,
		plugins: isProduction ? buildPlugins : devPlugins,
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		},
	}
}
