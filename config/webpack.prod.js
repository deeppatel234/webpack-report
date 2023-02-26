const { merge } = require("webpack-merge");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = () => {
  return merge(common, {
    mode: "production",
    bail: true,
    output: {
      filename: "static/js/[name].[contenthash].js",
      chunkFilename: "static/js/[name].[contenthash].js",
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              // Emoji and regex is not minified properly using default
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 2,
          },
        },
      },
    },
  });
};
