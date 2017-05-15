const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const config = require('./config.json');

const srcPath = __dirname + '/src';
const distPath = __dirname + '/dist';

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: srcPath + '/index.html',
  filename: 'index.html',
  inject: true
});

const vendorConfig = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function (module) {
    // this assumes your vendor imports exist in the node_modules directory
    return module.context && module.context.indexOf('node_modules') !== -1;
  }
});

// CommonChunksPlugin will now extract all the common modules from vendor and main bundles
const manifestConfig = new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
});

const scssConfig = new ExtractTextWebpackPlugin({
  filename: "[name].[contenthash].css",
  allChunks: true
});

const faviconConfig = new FaviconsWebpackPlugin(srcPath + '/ffyyc-favicon.png');

const appConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  },
  PARSE: {
    APP_ID: JSON.stringify(config.parse.app_id),
    JS_KEY: JSON.stringify(config.parse.js_key),
    URL: JSON.stringify(config.parse.url)
  },
  GOOGLE: {
    MAP: JSON.stringify(config.google.map),
    GA: JSON.stringify(config.google.ga)
  }
});

module.exports = function() {
  'use strict';

  return {
    entry: [
      srcPath + '/js/main.js',
      srcPath + '/scss/main.scss'
    ],
    output: {
      filename: '[name].[hash].js',
      path: distPath
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', {'modules': false}],
            'react'
          ]
        }
      }, {
        test: /\.css$/,
        use: scssConfig.extract(['css-loader'])
      }, {
        test: /\.(sass|scss)$/,
        use: scssConfig.extract(['css-loader', 'sass-loader'])
      }, {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }, {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      }]
    },
    devtool: 'source-map',
    devServer: { historyApiFallback: true },
    plugins: [
      appConfig,
      vendorConfig,
      manifestConfig,
      faviconConfig,
      htmlWebpackPluginConfig,
      scssConfig
    ]
  };
};
