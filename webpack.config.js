const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

// In dev mode if not env.NODE_ENV is not production //
const devMode = process.env.NODE_ENV !== 'production';

const plugins = [new CleanWebpackPlugin()];

// Enable MiniCss in production only //
if (!devMode) {
  plugins.push(new MiniCssExtractPlugin({
    filename:'style.css'
  }));
}


module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/scripts')
  },

  plugins,

  module: {
    rules:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: [
          {
            loader: "source-map-loader"
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          //If we're in dev-mode, use inline-styles, else extract to separate css file
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          "sass-loader",
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    proxy: {'/' : 'http://localhost:4200'},
    publicPath: '/scripts/',
    watchContentBase: true
  },

  devtool: 'cheap-module-source-map'
}