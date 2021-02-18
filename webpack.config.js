const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fullySpecified: false,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
      fallback: {
         stream: require.resolve("stream-browserify") ,
         crypto: require.resolve("crypto-browserify")
      }
  }
};
