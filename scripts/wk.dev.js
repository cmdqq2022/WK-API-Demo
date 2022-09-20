const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pkg = require('../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1500,
  },
  entry: {
    index: path.resolve(pkg.nativeMain),
  },
  output: {
    filename: 'index.bundle',
    strictModuleExceptionHandling: true,
    path: path.resolve('./dist/dev/'),
    globalObject: '(0, eval)("this")',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        HOST: JSON.stringify(process.env.DEV_HOST || '127.0.0.1'),
        PORT: JSON.stringify(process.env.DEV_PORT || 38989),
      },
      __PLATFORM__: null,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, '../src/assets/raw'), 
          to: path.resolve(__dirname, '../dist/dev/assets/raw'), 
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          'scope-loader',
          'unicode-loader',
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: [[
                '@babel/preset-env',
                {
                  targets: {
                    chrome: 57,
                    ios: 9,
                  },
                },
              ]],
              plugins: [
                ['@babel/plugin-proposal-class-properties'],
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-transform-runtime', { regenerator: true }],
              ],
            },
          },
          'unicode-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'ystv-vue-css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'ystv-vue-css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        }],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [path.resolve(__dirname, '../node_modules')],
    alias: (() => {
      const aliases = {
        vue: 'ystv-vue',
        '@': path.resolve('./src'),
        'vue-router': 'ystv-vue-router',
      };
	  
      return aliases;
    })(),
  },
};
