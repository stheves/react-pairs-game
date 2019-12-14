module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "react-pairs-game.js"
    },
    devServer: {
        contentBase: [__dirname + "/dist", __dirname + "/demo"]
    }
};
