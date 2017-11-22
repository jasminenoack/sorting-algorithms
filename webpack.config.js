module.exports = {
  entry: {
    sortComp: "./src/page_runners/sortComp.ts",
    queens: "./src/page_runners/queensBackground.ts",
    test: "./src/page_runners/test.ts",
    utils: "./src/page_runners/utils.ts",
    sortIndex: "./src/page_runners/sortIndex.ts",
    profileComp: "./src/page_runners/profileComp.ts",

    bogo: "./src/page_runners/sorts/bogoPage.ts",
    bubble: "./src/page_runners/sorts/bubblePage.ts",
    cocktail: "./src/page_runners/sorts/cocktailPage.ts",
    comb: "./src/page_runners/sorts/combPage.ts",
    cycle: "./src/page_runners/sorts/cyclePage.ts",
    gnome: "./src/page_runners/sorts/gnomePage.ts",
    heap: "./src/page_runners/sorts/heapPage.ts",
    insertion: "./src/page_runners/sorts/insertionPage.ts",
    oddEven: "./src/page_runners/sorts/oddEvenPage.ts",
    quick: "./src/page_runners/sorts/quickPage.ts",
    selection: "./src/page_runners/sorts/selectionPage.ts",
    smooth: "./src/page_runners/sorts/smoothPage.ts",
    stooge: "./src/page_runners/sorts/stoogePage.ts",
  },
  output: {
    filename: "[name].entry.js",
    path: __dirname + "/dist",
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};
