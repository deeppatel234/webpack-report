const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackReport = require('webpack-report');
const bebelConfig = require("../config/babel.config");

const PUBLIC_DIR = path.resolve(__dirname, './public');
const DIST_DIR = path.resolve(__dirname, './build');
const CLIENT_DIR = path.resolve(__dirname, './src');

const PORT = 1237;

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    app: `${CLIENT_DIR}/index.js`,
  },
  output: {
    path: DIST_DIR,
    publicPath: "/",
    clean: true,
  },
  cache: {
    type: "filesystem",
    store: "pack",
  },
  stats: {
    children: false,
    colors: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: PORT,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: CLIENT_DIR,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          cacheCompression: false,
          ...bebelConfig(),
        },
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${DIST_DIR}/index.html`,
      template: `${PUBLIC_DIR}/index.html`,
      chunksSortMode: "none",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[name].[contenthash].css",
      insert: (linkTag) => document.body.appendChild(linkTag),
      ignoreOrder: true,
    }),
    // new WebpackReport(),
  ],
};
