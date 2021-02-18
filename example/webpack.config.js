const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
