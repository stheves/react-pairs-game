module.exports = {
   entry: { app: './src/index.js' },
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
   devServer: {
      publicPath: '/static/',
      contentBase: [__dirname + '/demo/'],
      port: 3000,
      watchContentBase: true,
      compress: true,
      overlay: {
         warnings: false,
         errors: true,
      },
   },
};
