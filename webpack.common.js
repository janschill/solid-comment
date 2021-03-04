const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'solid-comment.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify')
    }
  }
}
