const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const platform = 'android';

module.exports = {
  mode: 'production',
  bail: true,
  entry: {
    vendor: [path.resolve(__dirname, './vendor.js')],
  },
  output: {
    filename: `[name].${platform}.js`,
    path: path.resolve(`./dist/${platform}/`),
    globalObject: '(0, eval)("this")',
    library: 'hippyVueBase',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __PLATFORM__: JSON.stringify(platform),
    }),
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '..'),
      path: path.resolve(__dirname, `../dist/${platform}/[name]-manifest.json`),
      name: 'hippyVueBase',
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
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
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
              ],
            },
          },
          'unicode-loader',
        ],
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
