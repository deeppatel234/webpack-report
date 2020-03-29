const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: PATHS.BUILD_DIR,
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            warnings: false,
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `${PATHS.DIST_DIR}/index.html`,
      template: `${PATHS.PUBLIC_DIR}/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      },
    }),
  ],
});
