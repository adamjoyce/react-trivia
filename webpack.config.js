const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: ['babel-polyfill', './app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader'},
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};

module.exports = config;
