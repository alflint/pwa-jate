const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: "[name][ext]"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate',
        favicon: './favicon.ico',
        logo: './src/images/logo.png',
      }),
      new WebpackPwaManifest({
        name: 'Jate',
        short_name: 'Jate',
        start_url: './',
        publicPath: './',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],

      }),
      new InjectManifest({
        swSrc: './src-sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'images',
          },
        },
      ],
    },
  };
};
