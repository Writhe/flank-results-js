const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

const terserOptimisation = {
  minimize: true,
  minimizer: [new TerserPlugin()],
};

const isProduction = typeof NODE_ENV !== undefined && NODE_ENV === 'production';

const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';
const optimization = isProduction ? terserOptimisation : undefined;

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  mode,
  devtool,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/, use: [
          {loader: "style-loader"},
          {loader: "css-loader", options: { modules: false }},
          {loader: "sass-loader"},
        ],
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  optimization,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    contentBase: './build',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      template: 'index.ejs',
      filename: 'index.html',
      title: 'report 001',
      minify: true,
      inlineBundle: isProduction,
    }),
  ]
};
