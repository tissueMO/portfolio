// 各種プラグインのロード
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");


// 本番用の設定追加分
module.exports = merge(common.app, {
  mode: "production",
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new TerserJSPlugin(),
    new UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
          {
            loader: "ejs-html-loader",
            options: {
              // JSON動的コンテンツをEJSにインジェクションする
              contents: common.dynamicContents,
            },
          },
        ],
      },
    ],
  },
});
