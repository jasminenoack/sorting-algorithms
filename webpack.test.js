var webpackConfig = require("./webpack.config.js");
var path = require("path");

webpackConfig.module.loaders.push({
  enforce: "post",
  exclude: /node_modules|\.spec\.js$/,
  test: /\.ts$|\.tsx$/,
  use: {
    loader: "istanbul-instrumenter-loader",
    options: { esModules: true },
  },
});

webpackConfig.devtool = "cheap-module-source-map";

module.exports = webpackConfig;
