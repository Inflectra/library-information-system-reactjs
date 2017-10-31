const webpack = require('webpack'),
      path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build/client/public'),
      APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
  entry: {
    index: APP_DIR + '/app.jsx'
  },
  output: {
    filename: 'app.js',
    path: BUILD_DIR
  },
  devtool: 'source-map',
  module : {
    rules : [
      { test : /\.jsx?/, 
        exclude: /node_modules/,
        include : APP_DIR,
        use : 'babel-loader' }
    ]
  }
};

module.exports = config;