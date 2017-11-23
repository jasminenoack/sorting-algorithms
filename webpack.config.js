module.exports = {
  entry: {
    index: "./app/index.ts",
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        loader: "ts-loader",
        test: /\.tsx?$/,
      },
      {
        loader: "nunjucks-loader",
        test: /\.(njk|nunjucks)$/,
      },
    ],
  },
  output: {
    filename: "[name].entry.js",
    path: __dirname + "/dist",
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
};
