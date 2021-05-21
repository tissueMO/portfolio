# 対外向けポートフォリオページ

[![GitHub Pages](https://github.com/tissueMO/portfolio/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/tissueMO/portfolio/actions/workflows/gh-pages.yml)

## 環境構築

`$ yarn`

## ローカルサーバー立ち上げ・Watch

`$ yarn run start`

## 静的ビルド (開発用)

`$ yarn run dev`

## 静的ビルド (本番用)

`$ yarn run build`

## `public/` 以下を GitHub Pages にデプロイ

`$ yarn run deploy`

## アクセシビリティテスト

`$ yarn run lighthouse --chrome-flags="--no-sandbox --headless" http://127.0.0.1:3000/`
