// ###################################################################
//    JS エントリーポイント
// ###################################################################
const $ = require('../../node_modules/jquery/dist/jquery');
const Swiper = require('../../node_modules/swiper/js/swiper');
const Chart = require('../../node_modules/chart.js/dist/Chart');
require('../../node_modules/bootstrap/dist/js/bootstrap');

$(() => {
  // スムーズスクロール
  $('a.js-scroll-trigger[href^="#"]:not([href="#"])').click(e => {
    const href = $(e.currentTarget).attr('href');

    $('html, body').animate({
      scrollTop: $(href).offset().top - $('#main-nav').height()
    });

    return false;
  });
  $('.js-scroll-trigger').click(() => {
    $('.navbar-collapse').collapse('hide');
  });

  // ナビゲーションバーのスクロールスパイ
  $('body').scrollspy({
    target: '#main-nav',
    offset: $('#main-nav').height() + 2
  });

  // 一定のスクロール位置に達したらナビゲーションバーを縮める
  const navbarCollapse = () => {
    if ($('#main-nav').offset().top > 100) {
      $('#main-nav, #main-nav .nav-item.dropdown .dropdown-menu').addClass('navbar-shrink');
    } else {
      $('#main-nav, #main-nav .nav-item.dropdown .dropdown-menu').removeClass('navbar-shrink');
    }
  };
  navbarCollapse();
  $(window).scroll(navbarCollapse);

  // ポートフォリオモーダル内のSwiper
  $('.js-portfolio-modal').on('shown.bs.modal', e => {
    const $this = $('.swiper-container', e.currentTarget);
    const index = $('.swiper-container').index($this);
    if ($this.data('swiper')) {
      // 既に初期化済み
      $this.data('swiper').updateAutoHeight(100);
      return;
    }

    $this.data('swiper', new Swiper(
      `.swiper-container-portfolio-${index + 1}`, Object.assign({
        slidesPerView: 1,
        autoHeight: true
      }, ($('.swiper-slide', $this).length <= 1) ? {} : {
        loop: true,
        pagination: {
          el: `.swiper-pagination-portfolio-${index + 1}`,
          type: 'bullets',
          clickable: true
        },
        navigation: {
          prevEl: `.swiper-button-prev-portfolio-${index + 1}`,
          nextEl: `.swiper-button-next-portfolio-${index + 1}`
        }
      })
    ));
    $this.data('swiper').updateAutoHeight(100);
  });

  // スキルセクションのレーダーチャート
  $('.js-skills-chart').each((index, el) => {
    const $this = $(el);
    const $canvas = $('.js-skills-chart-canvas', el);
    const chart = JSON.parse($('.js-skills-chart-data', $this).val().replace(/'/g, '"'));

    $this.data('chart', new Chart($canvas[0], {
      type: chart.type,
      data: chart.data,
      options: {
        title: {
          display: true,
          fontSize: 26,
          fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, Roboto, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo, メイリオ, sans-serif',
          padding: 7,
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
            backgroundColor: 'rgba(0, 0, 0, 0)'
          }
        }
      }
    }));
  });
});
