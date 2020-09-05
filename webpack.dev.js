const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = merge(common, {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
});

module.exports = config;
