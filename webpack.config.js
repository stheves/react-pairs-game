module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        path: __dirname + '/dist',
        filename: 'react-pairs-game.js',
        libraryTarget: 'amd',
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDom',
    },
    devServer: {
        contentBase: [__dirname + '/dist', __dirname + '/demo'],
    },
};
