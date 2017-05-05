var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'src');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  'use strict';

  return {
    entry: {
      main: path.join(srcPath, '/js/main.js')
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test:/\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [
            {loader: "style-loader"},     // creates style nodes from JS strings
            {loader: "css-loader"},       // translates CSS into CommonJS
            {loader: "sass-loader"}       // compiles Sass to CSS
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'src/index.html'
      })
    ]
  };
};
