const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const rootDir = process.cwd();

module.exports = {
  entry: { index: './src/index.tsx' },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1, url: true } }, 'postcss-loader'],
      },
      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      base: '/',
      title: 'Imgar',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv(),
  ],
};
