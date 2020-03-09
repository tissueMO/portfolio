// ###################################################################
//    汎用機能
// ###################################################################
const $ = require('../../node_modules/jquery/dist/jquery');

$(() => {
  // スムーズスクロール
  $('a.js-scroll-trigger[href^="#"]:not([href="#"])').click(e => {
    const href = $(e.currentTarget).attr('href');

    $('html, body').animate({
      scrollTop: $(href).offset().top - $('#main-nav').height()
    });

    return false;
  });
});
