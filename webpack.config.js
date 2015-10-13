var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app.js',
  // entry: './js/pbt',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, loader: 'style!css'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      Rx: 'rx'
    })
  ],
  resolve: {
    root: path.resolve('.'),
    extensions: ['', '.js', '.json'],
    alias: {
      jquery: 'lib/jquery-2.1.4.min',
      rx: 'lib/rx.all'
    }
  }
};
