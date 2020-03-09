// ###################################################################
//    Skills
// ###################################################################
const $ = require('../../node_modules/jquery/dist/jquery');
const Chart = require('../../node_modules/chart.js/dist/Chart');
const pallete = require('../../node_modules/google-palette/palette');

$(() => {
  // カラーパターンを自動生成
  const colors = pallete('tol', $('.js-skills-chart').length, 3).map(hex => `#${hex}`);

  // スキルセクションのレーダーチャート
  $('.js-skills-chart').each((index, el) => {
    const $this = $(el);
    const $canvas = $('.js-skills-chart-canvas', el);
    const chart = JSON.parse($('.js-skills-chart-data', $this).val().replace(/'/g, '"'));

    // 自動生成したカラーを適用
    chart.data.datasets[0].borderColor = colors[index];
    chart.data.datasets[0].backgroundColor = `${colors[index]}33`;

    // Chart.js グラフ生成
    $this.data('chart', new Chart($canvas[0], {
      type: chart.type,
      data: chart.data,
      options: {
        title: {
          display: true,
          fontSize: 26,
          padding: 0,
          text: chart.title
        },
        legend: {
          display: false
        },
        scale: {
          ticks: {
            min: 0,
            max: 100,
            fontColor: 'rgba(127, 127, 127, 0.5)',
            showLabelBackdrop: false,
            beginAtZero: true,
            backdropPaddingY: 5
          },
          pointLabels: {
            fontSize: 16
          }
        },
        tooltips: {
          enabled: false
        }
      }
    }));
  });
});
