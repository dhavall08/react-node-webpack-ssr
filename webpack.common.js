const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        // exclude: [path.resolve('node_modules')],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // extract css or JS modules into a separate file
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // to get autoprefixer (and precss) working on @imported CSS files we use importLoaders
              // modules: {
              //   localIdentName: "[name]__[local]___[hash:base64:5]",
              // }, // for css modules
            },
          }, // interprets @import and url() like import/require() and will resolve them, translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // webpack requires an identifier (ident) in options when require is used
              plugins: () => [autoprefixer()],
            },
          },
          'sass-loader', // loads a Sass/SCSS file and compiles it to CSS.
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif|ico)$/,
        loader: 'url-loader', // see readme for details
        options: {
          name: '[name].[ext]?[hash]',
          limit: 8192, // in bytes
          outputPath: 'assets/images/',
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'assets/fonts/',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      // Simplifies creation of HTML files automatically
      template: __dirname + '/src/index.html',
      filename: './index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'), // from where to serve files, can be array of multiples
    // port: 3000,
    // https: true,
    // publicPath: '/', // base path for all the assets within your application
    historyApiFallback: true, // historyAPIFallback will redirect 404s to /index.html
    // quiet: true // errors and warnings are not visible
  },
};

module.exports = config;
