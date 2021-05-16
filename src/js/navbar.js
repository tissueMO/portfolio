// ###################################################################
//    ナビゲーションバー
// ###################################################################
const $ = require('../../node_modules/jquery/dist/jquery');

$(() => {
  // ナビゲーションバーのスクロールスパイ
  $('body').scrollspy({
    target: '#main-nav',
    offset: $('#main-nav').height() + 10
  });
  $('.js-scroll-trigger').click(() => {
    $('.navbar-collapse').collapse('hide');
  });

  // 一定のスクロール位置に達したらナビゲーションバーを縮める
  const navbarCollapse = () => {
    if ($('#main-nav').offset().top > 100) {
      $('#main-nav, #main-nav .nav-item.dropdown .dropdown-menu')
        .addClass('navbar-shrink');
    } else {
      $('#main-nav, #main-nav .nav-item.dropdown .dropdown-menu')
        .removeClass('navbar-shrink');
    }
  };
  navbarCollapse();
  $(window).scroll(navbarCollapse);
});
