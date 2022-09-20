const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const pkg = require('../package.json');
const manifest = require('../dist/android/vendor-manifest.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const platform = 'android';

module.exports = {
  mode: 'production',
  bail: true,
  entry: {
    index: [path.resolve(pkg.nativeMain)],
  },
  output: {
    filename: `[name].${platform}.js`,
    path: path.resolve(`./dist/${platform}/`),
    globalObject: '(0, eval)("this")',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __PLATFORM__: JSON.stringify(platform),
    }),
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, '../src/assets/raw'), 
          to: path.resolve(__dirname, '../dist/android/assets/raw'), 
        },
      ],
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_console: true, // 放弃对`console.*`函数的调用（删除console）
          drop_debugger: false, // 删除debugger
          pure_funcs: ['console.log'] 
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
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
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: 57,
                    },
                  },
                ],
              ],
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
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        }],
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
