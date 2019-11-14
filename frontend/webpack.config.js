const path = require('path');
const cssExtract = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public/"),
    filename: "./js/main.js"
  },
  module: {
    rules: [
      {
       test: /\.vue$/,
       loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: cssExtract.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: cssExtract.loader
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './img/'
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\??\#?v=[.0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './fonts/'
            },
          },
        ],
      }
    ],
  },
  devServer: {
    open: true,
    inline: true,
    host: 'localhost',
    port: 18002,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new cssExtract({
      filename: './css/main.css',
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      Plugins: path.resolve(__dirname, './src/plugins/'),
      Assets: path.resolve(__dirname, './src/assets/'),
      Store: path.resolve(__dirname, './src/store/index.js'),
      Components: path.resolve(__dirname, './src/components/')
    }
  }
};
