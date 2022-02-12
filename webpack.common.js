// 各種プラグインのロード
const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const globule = require('globule');

// ビルド先パス
const DEST_PATH = path.join(__dirname, './public');

// EJSのファイル変換ルール
const getEntriesList = (targetTypes) => {
  const entriesList = {};
  for (const [srcType, targetType] of Object.entries(targetTypes)) {
    const filesMatched = globule.find([`**/*.${srcType}`, `!**/_*.${srcType}`], {cwd: `${__dirname}/src`});

    for (const srcName of filesMatched) {
      const targetName = srcName.replace(new RegExp(`.${srcType}$`, 'i'), `.${targetType}`);
      entriesList[targetName] = `${__dirname}/src/${srcName}`;
    }
  }
  return entriesList;
};

// JSONに定義した動的コンテンツを読み込む
const getDynamicContentsJsonFiles = () => {
  const jsonFiles = [];
  const filesMatched = globule.find(['**/*.json'], { cwd: `${__dirname}/src/json` });

  for (const srcName of filesMatched) {
    jsonFiles.push(`${__dirname}/src/json/${srcName}`);
  }

  return jsonFiles;
};
const dynamicContentsJsonFiles = getDynamicContentsJsonFiles();
const dynamicContents = {};
for (const jsonFile of dynamicContentsJsonFiles) {
  const jsonText = fs.readFileSync(jsonFile, 'utf-8');
  const json = JSON.parse(jsonText);
  Object.assign(dynamicContents, json);
}

const app = {
  entry: Object.assign(
    {
      app: [
        './src/js/main.js',
        './src/scss/style.scss',
      ],
    },
  ),
  output: {
    path: path.resolve(__dirname, DEST_PATH),
    filename: 'js/[name].min.js',
    // サブディレクトリー以下に公開できるようにするためにパスの起点を省略する
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer(),
              ],
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: (resourcePath, query) => {
              const basePath = path.join(__dirname, 'src/');
              return resourcePath
                .substring(basePath.length)
                .replace(/\\/g, '/');
            },
            // 'img/[to]/[name].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css',
    }),
    new CopyWebpackPlugin(
      [
        {
          context: 'src/img',
          from: '**/*',
          to: path.resolve(DEST_PATH, 'img'),
        },
      ],
    ),
  ],
  performance: {
    hints: false,
  },
};

// EJSの変換定義を現在存在するファイル分だけ自動的に追加
for (const [targetName, srcName] of Object.entries(getEntriesList({ejs: 'html'}))) {
  app.plugins.push(new HtmlWebpackPlugin({
    template: srcName,
    filename: targetName,
    minify: true,
  }));
}

module.exports = {
  DEST_PATH: DEST_PATH,
  app: app,
  dynamicContents: dynamicContents,
};
