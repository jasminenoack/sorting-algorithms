var webpackConfig = require("./webpack.config.js");
var path = require("path");

webpackConfig.module.loaders.push({
  test: /\.ts$|\.tsx$/,
  use: {
    loader: "istanbul-instrumenter-loader",
    options: { esModules: true },
  },
  enforce: "post",
  exclude: /node_modules|\.spec\.js$/,
});

webpackConfig.devtool = "cheap-module-source-map";

module.exports = webpackConfig;
