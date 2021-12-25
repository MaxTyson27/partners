$(function () {
  $('#name-input').keypress(function (e) {
    if (e.keyCode == 32) return false;
    if (this.value.length == 1) {
      this.value = this.value.toUpperCase();
    }
  });

  $('#phone-input').inputmask({ "mask": "+7(999) 999-99-99" });


  $('.burger').on('click', function () {
    $('.menu').toggleClass('menu--active');
    $(this).toggleClass('burger--active');
    $('.logo').toggleClass('logo--active');
    $('.header__phone').toggleClass('header__phone--active');
    $('.header__icon').toggleClass('header__icon--active');
  })


  // $('.product-tabs__top-item').on('click', function (e) {
  //   e.preventDefault();
  //   $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
  //   $(this).addClass('product-tabs__top-item--active');

  //   $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
  //   $($(this).attr('href')).addClass('product-tabs__content-item--active');
  // });
})

var link = document.querySelector('.program__tab--disable');
link.href = '';