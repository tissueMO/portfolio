// ###################################################################
//    Portfolio
// ###################################################################
const $ = require('../../node_modules/jquery/dist/jquery');
const Swiper = require('../../node_modules/swiper/swiper-bundle');

$(() => {
  // 遅延ロード時の画像表示対策
  $('.js-portfolio-modal').on('error', () => {
    // this.src = '';
  });

  // スライダーの画像数が1枚しかない場合はページャーを非表示にする
  $('.js-portfolio-modal').on('show.bs.modal', e => {
    const $this = $('.swiper-container', e.currentTarget);
    const $imageElements = $('img', $this);
    if ($imageElements.length === 1) {
      $('.swiper-button-prev, .swiper-button-next', e.currentTarget).remove();
    }
  });

  // スライダー初期化
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
          autoHeight: true,
          preloadImages: false,
          lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
            loadOnTransitionStart: true
          }
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

  // もっと見るボタン
  $('.js-portfolio-showmore').on('click', e => {
    const $this = $(e.currentTarget);
    $this.remove();
    $('.js-portfolio-item-showmore').removeClass('portfolio-item-showmore');
    return false;
  });
});
