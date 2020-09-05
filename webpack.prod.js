const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = merge(common, {
  entry: './src/hydratedIndex.js',
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    publicPath: '/dist/', // when create js file it adds /dist/main.js. Useful when serving from node server
  },
});

module.exports = config;
