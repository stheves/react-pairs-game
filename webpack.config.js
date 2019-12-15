const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
   entry: ['./src/index.js'],
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader'],
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
      library: 'ReactPairsGame',
      libraryTarget: 'umd',
   },
   externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ErrorOverlayPlugin(),
   ],
   devtool: 'source-map',
   devServer: {
      publicPath: '/static/',
      contentBase: [__dirname + '/demo/'],
      port: 3000,
      compress: true,
      watchContentBase: true,
   },
};
