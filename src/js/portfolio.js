// ###################################################################
//    Portfolio
// ###################################################################
const $ = require('../../node_modules/jquery/dist/jquery');
const Swiper = require('../../node_modules/swiper/js/swiper');

$(() => {
  $('.js-portfolio-modal').on('shown.bs.modal', e => {
    const $this = $('.swiper-container', e.currentTarget);
    const index = $('.swiper-container').index($this);

    if ($this.data('swiper')) {
      // 既に初期化済み
      $this.data('swiper').updateAutoHeight(100);
      return;
    }

    // Swiper 生成
    $this.data('swiper', new Swiper(
      `.swiper-container-portfolio-${index + 1}`,
      Object.assign(
        {
          slidesPerView: 1,
          autoHeight: true
        },
        ($('.swiper-slide', $this).length <= 1) ? {} : {
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
        }
      )
    ));
    $this.data('swiper').updateAutoHeight(100);
  });
});
