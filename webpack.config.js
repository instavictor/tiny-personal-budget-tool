var webpack = require('webpack');
var path = require('path');

var isDevEnabled = (process.argv.indexOf('-p') < 0) && JSON.parse(process.env.BUILD_DEV || true);

// Macros for environment builds and debugging
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(isDevEnabled),
  'process.env.NODE_ENV': (!isDevEnabled) ? '"production"' : '"dev"'
});

if (isDevEnabled) {
  console.log('WARNING YOU ARE IN DEV MODE');
}

// Aliasing provider plugins
var providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  Rx: 'rx'
});

module.exports = {
  entry: './app.js',
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
  plugins: [providePlugin, definePlugin],
  resolve: {
    root: path.resolve('.'),
    extensions: ['', '.js', '.json'],
    alias: {
      jquery: 'lib/jquery-2.1.4.min',
      rx: 'node_modules/rx/dist/rx.lite.min'
    }
  }
};
