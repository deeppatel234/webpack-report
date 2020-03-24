const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const detect = require('detect-port');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

const PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || '0.0.0.0';

module.exports = async () => {
  const port = await detect(PORT);

  return merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
      path: PATHS.DIST_DIR,
      filename: 'static/js/[name].[hash].js',
      publicPath: '/',
    },
    devServer: {
      port,
      host: HOST,
      contentBase: './',
      historyApiFallback: true,
      hot: true,
      open: true,
      compress: true,
      writeToDisk: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${PATHS.DIST_DIR}/index.html`,
        template: `${PATHS.PUBLIC_DIR}/index.html`,
      }),
    ],
  });
};
