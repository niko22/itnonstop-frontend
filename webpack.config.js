const path = require('path');
const webpack = require('webpack');
const _ = require('underscore');

const isProd = process.env.npm_lifecycle_event === 'deploy';
const output = {
  path: path.resolve(__dirname, './dist'),
  filename: 'app.js',
};

const config = {
  context: path.join(__dirname, './src'),
  entry: {
    javascript: 'app.js',
    html: 'index.html',
  },
  output,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname, './src'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        pathRewrite: { '^/api': '' },
      }
    }
  }
};

const prodConfig = _.extend({}, config, {
  output: _.extend({}, output, { publicPath: path.resolve(__dirname, './dist') }),
  plugins: [new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })]
});

module.exports = isProd ? prodConfig : config;
