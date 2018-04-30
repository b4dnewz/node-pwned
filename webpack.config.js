const path = require('path');
const name = 'pwned';
const library = 'Pwned';

const serverConf = {
  entry: './lib/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${name}.node.js`,
    library: library,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};

const clientConf = {
  entry: './lib/index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${name}.web.js`,
    library: library,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};

module.exports = [serverConf, clientConf];
