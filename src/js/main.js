// ###################################################################
//    JS エントリーポイント
// ###################################################################
const $ = require('jquery');
require('bootstrap');

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
});
