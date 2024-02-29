const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: [
      './src/assets/script.js',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/[name].js',
    assetModuleFilename: 'assets/images/[name][ext][query]',
    // clean: true,
  },

  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: '3rdpart',
          chunks: 'all',
        },
        styles: {
          test: /[\\/]node_modules[\\/]/,
          name: '3rdpart',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: 'all',
      title: 'todo.List',
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // 2. remove CSS from JS and save into an external file
          { loader: MiniCssExtractPlugin.loader },
          // 1. generate CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          // 3. remove CSS from JS and save into an external file
          MiniCssExtractPlugin.loader,
          // 2. generate CSS into CommonJS
          'css-loader',
          // 1. tranpile SCSS into CSS
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.json$/,
        type: 'json',
    }
    ],
  },
};
