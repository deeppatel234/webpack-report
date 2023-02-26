const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const bebelConfig = require("./babel.config");

const PATHS = require("./paths");

// Set Environment
const NODE_ENV = process.env.NODE_ENV || "development";

const isEnvDevelopment = NODE_ENV === "development";
const isEnvProduction = NODE_ENV === "production";

module.exports = {
  devtool: false,
  entry: {
    app: `${PATHS.CLIENT_DIR}/index.js`,
  },
  output: {
    path: PATHS.DIST_DIR,
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
    alias: {
      src: PATHS.CLIENT_DIR,
      Components: PATHS.COMPONENTS_DIR,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: PATHS.CLIENT_DIR,
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
        test: /\.(jpg|png|svg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/media/images/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/media/fonts/[name].[contenthash][ext]",
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
              sourceMap: isEnvDevelopment,
            },
          },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PATHS.PUBLIC_DIR,
          to: PATHS.DIST_DIR,
          filter: async (resourcePath) => {
            if (resourcePath.includes("index.html")) {
              return false;
            }
            return true;
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[name].[contenthash].css",
      insert: (linkTag) => document.body.appendChild(linkTag),
      ignoreOrder: true,
    }),
    isEnvProduction &&
      new HtmlWebpackPlugin({
        filename: `${PATHS.DIST_DIR}/index.html`,
        template: `${PATHS.PUBLIC_DIR}/index.html`,
        chunksSortMode: "none",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    isEnvDevelopment &&
      new HtmlWebpackPlugin({
        filename: `${PATHS.DIST_DIR}/index.html`,
        template: `${PATHS.PUBLIC_DIR}/index.html`,
        chunksSortMode: "none",
      }),
    new CaseSensitivePathsPlugin(),
  ].filter(Boolean),
};
