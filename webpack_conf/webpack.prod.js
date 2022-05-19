const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    main: ['./src/index.jsx'],
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      // name this file main, so that it does not get automatically requested as a static file
      filename: 'main.html',
      inject: true,
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      // a favicon can be included in the head. use this config to point to it
      // favicon: resolve(__dirname, '..', 'src', 'favicon.png'),
      alwaysWriteToDisk: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/, // regex to see which files to run babel on
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
});
