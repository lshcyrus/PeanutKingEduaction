const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // webpack 打包的起始檔案
  output: {
    path: 'D:/PeanutKINGEducation_CourseContent/webpack',
    filename: 'PKE_StudentPanel_v0.7.js'  // webpack name, change the version number so the website will update after refresh
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
          },
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
}