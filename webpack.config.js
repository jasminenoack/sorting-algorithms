module.exports = {
    entry: {
        sortComp: "./typescript/page_runners/sortComp.ts",
        queens: "./typescript/page_runners/queensBackground.ts",
        test: "./typescript/page_runners/test.ts",
        utils: './typescript/page_runners/utils.ts',
        bubble: './typescript/page_runners/bubblePage.ts'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].entry.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
}
