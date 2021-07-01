const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { HOST, PORT, STRAPI_HOST, STRAPI_PORT } = process.env;

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      react: path.resolve('node_modules', 'react'),
      'styled-components': path.resolve('node_modules', 'styled-components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: HOST || 'localhost',
    port: PORT || 3000,
    proxy: {
      '/api': {
        target: {
          host: STRAPI_HOST,
          protocol: 'http:',
          port: STRAPI_PORT,
        },
        ignorePath: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
};