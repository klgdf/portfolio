/**
 * Функция для создания слайдера на главной странице посадочный экран
 */
$(function() {
    $('.main-slider').slick({
        prevArrow: $('.arrow-prev'),
        nextArrow: $('.arrow-next'),
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true
    });

    $('.main-slider').show();
});
