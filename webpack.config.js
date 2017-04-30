'use strict'

const ExtractPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  devtool:  `eval`,
  entry: `${__dirname}/example/main.js`,
  output: {
    path: `${__dirname}/docs`,
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractPlugin('bundle.css'),
    new HtmlPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.*\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.*\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader'])
      },
    ],
  },
}
