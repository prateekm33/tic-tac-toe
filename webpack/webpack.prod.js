const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '..', 'src', 'dist'),
    filename: '[name].bundle.js'
  }
});


