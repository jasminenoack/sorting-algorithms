module.exports = {
    entry: {
        sortComp: "./typescript/sortComp.ts",
        queens: "./typescript/queensBackground.ts",
        test: "./typescript/test.ts",
        utils: './typescript/utils.ts'
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
