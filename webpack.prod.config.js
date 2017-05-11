const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

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

const uglifyConfig = new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    warnings: false
  }
});

const defineConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

module.exports = function(env) {
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
    plugins: [
      defineConfig,
      vendorConfig,
      manifestConfig,
      htmlWebpackPluginConfig,
      scssConfig,
      uglifyConfig
    ]
  };
};
