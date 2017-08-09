module.exports = {
    entry: {
        sortComp: "./typescript/page_runners/sortComp.ts",
        queens: "./typescript/page_runners/queensBackground.ts",
        test: "./typescript/page_runners/test.ts",
        utils: './typescript/page_runners/utils.ts',
        sortIndex: './typescript/page_runners/sortIndex.ts',
        profileComp: './typescript/page_runners/profileComp.ts',

        bogo: './typescript/page_runners/sorts/bogoPage.ts',
        bubble: './typescript/page_runners/sorts/bubblePage.ts',
        cocktail: './typescript/page_runners/sorts/cocktailPage.ts',
        comb: './typescript/page_runners/sorts/combPage.ts',
        cycle: './typescript/page_runners/sorts/cyclePage.ts',
        gnome: './typescript/page_runners/sorts/gnomePage.ts',
        heap: './typescript/page_runners/sorts/heapPage.ts',
        insertion: './typescript/page_runners/sorts/insertionPage.ts',
        oddEven: './typescript/page_runners/sorts/oddEvenPage.ts',
        quick: './typescript/page_runners/sorts/quickPage.ts',
        selection: './typescript/page_runners/sorts/selectionPage.ts',
        smooth: './typescript/page_runners/sorts/smoothPage.ts',
        stooge: './typescript/page_runners/sorts/stoogePage.ts'
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
