const webpack = require("webpack");
// const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

/** @type {webpack.Configuration} */
module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: './src/index.ts',
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      },
      // {
      //   test: [/\.vert$/, /\.frag$/],
      //   use: "raw-loader"
      // },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'assets', to: 'assets' },
    ]),
    new WriteFilePlugin({
      useHashIndex: true
    }),
    new webpack.DefinePlugin({
      // SOME_VAR: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
