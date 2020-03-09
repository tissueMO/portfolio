// ###################################################################
//    JS エントリーポイント
// ###################################################################
const Chart = require('../../node_modules/chart.js/dist/Chart');
require('../../node_modules/jquery/dist/jquery');
require('../../node_modules/swiper/js/swiper');
require('../../node_modules/js-base64/base64');
require('../../node_modules/google-palette/palette');
require('../../node_modules/bootstrap/dist/js/bootstrap');

// Chart.js のグローバル初期設定
Chart.defaults.global.defaultFontFamily = 'Montserrat, -apple-system, BlinkMacSystemFont, Roboto, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo, メイリオ, sans-serif';
Chart.defaults.global.defaultFontSize = 14;
Chart.defaults.global.layout.padding = 14;
Chart.defaults.global.elements.point.pointStyle = 'rect';

// 分割ファイル読み込み
require('./common');
require('./navbar');
require('./portfolio');
require('./skills');
require('./contact');
