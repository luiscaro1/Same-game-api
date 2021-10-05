const path = require('path');

const Dotenv = require('dotenv-webpack');

const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/Startup.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js', '.tsx'],
  },
  plugins: [
    new Dotenv({ path: path.resolve(__dirname, '.env') }),
    new NodemonPlugin(),
  ],
};
