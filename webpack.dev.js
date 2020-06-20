// 各種プラグインのロード
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;


// 開発用の設定追加分
module.exports = merge(common.app, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
  ],
})
