const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    contentBase: "./",
    hot: true,
    port: 3000,
    proxy: {
      "/**": {
        target: "<%= proxyTarget %>",
        changeOrigin: true // Required to resolve to correct site when using Apache Virtual Hosts
      }
    }
  },

  output: {
    pathinfo: true,
    chunkFilename: "[name].chunk.js"
  },

  performance: {
    hints: false
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
});
