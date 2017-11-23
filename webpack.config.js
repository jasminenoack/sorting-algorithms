module.exports = {
  entry: {
    profileComp: "./src/page_runners/profileComp.ts",
    queens: "./src/page_runners/queensBackground.ts",
    sortComp: "./src/page_runners/sortComp.ts",
    sortIndex: "./src/page_runners/sortIndex.ts",
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader: "ts-loader" },
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
