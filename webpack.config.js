module.exports = {
  entry: './src/app.js',
  // devtool: 'inline-source-map',
  resolve: {
    fallback: { "buffer": require.resolve("buffer/") },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
};
