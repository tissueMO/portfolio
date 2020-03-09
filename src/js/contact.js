// ###################################################################
//    Contact
// ###################################################################
const $ = require('../../node_modules/jquery/dist/jquery');
const Base64 = require('../../node_modules/js-base64/base64').Base64;

$(() => {
  // コンタクトセクションのデコード
  $('.js-contact-item').each((index, el) => {
    const $this = $(el);
    if ($('input.js-encode', $this).length === 0) {
      return;
    }

    // エンコードされた項目をデコード
    let href = $('.js-address-link', $this).attr('href');
    let text = $('.js-address-link-text', $this).text().trim();
    href = Base64.decode(href);
    text = Base64.decode(text);
    $('.js-address-link', $this).attr('href', href);
    $('.js-address-link-text', $this).text(text);
  });
});
