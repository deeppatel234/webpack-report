const webpack = require("webpack");
const { merge } = require("webpack-merge");
const detect = require("detect-port");

const common = require("./webpack.common.js");

module.exports = async () => {
  const PORT = await detect(parseInt(process.env.PORT, 10));
  const HOST = process.env.HOST || "localhost";

  return merge(common, {
    mode: "development",
    output: {
      filename: "static/js/[name].[contenthash].js",
      chunkFilename: "static/js/[name].[contenthash].js",
    },
    devServer: {
      port: PORT,
      host: HOST,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: false,
        reconnect: 20,
      },
      https: false,
      http2: false,
      compress: true,
      historyApiFallback: true,
      static: false,
      hot: false,
      liveReload: true,
      open: true,
    },
    plugins: [new webpack.SourceMapDevToolPlugin({})],
  });
};
