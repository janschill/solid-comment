const path = require('path');

module.exports = {
  // devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    styles: './src/styles.js',
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: 'single',
  },
  resolve: {
    fallback: { "buffer": require.resolve("buffer/") },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
