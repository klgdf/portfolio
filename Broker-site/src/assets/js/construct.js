import __CONFIG_GLOBAL from '../../../site.config.json'; // глобальный файл конфигурации сайта
import __FULL_CONTENT from '../../../build/content.json'; // весь сгенерированный контент

import '@babel/polyfill';
import $ from 'jquery';

window.$ = $;
window.jQuery = $;
import AOS from "aos";
import Parallax from 'parallax-js';
import 'slick-carousel';
import 'select2';
import 'jquery-validation';
import 'jquery-mask-plugin';
import 'magnific-popup';

require('./vendor/jquery.animateNumber.min');
require('./vendor/jquery.viewportchecker.min');

require('./blocks/forms');
require('./blocks/news');
require('./blocks/table');
require('./blocks/tradeview');
require('./blocks/footer');
require('./blocks/calculator');
require('./blocks/select');
require('./blocks/index');
require('./blocks/about');
require('./main');

// window.buildRelease - переменная имеет true или false - означает сборка build:release или любая другая
// true - значит build:release сборка
// false - значит любая другая

/**
 * Фиксация шапки при скроле
 */
(function fixedMenu() {
    var coordinateMenu = $(".nav").offset().top;
    $(window).scroll(function() {
        if ($(this).scrollTop() > coordinateMenu) {
            $(".nav").addClass("sticky");
        } else {
            $(".nav").removeClass("sticky");
        }
    });
})();

/**
 * Инициализация AOS
 */
(function addedAosPlagin() {
    AOS.init({
        duration: __CONFIG_GLOBAL.javascript.aos.duration,
    });
})();

/**
 * Инициализация паралакса
 */
(function addedParallax() {
    $('.scene').each(function(i, e) {
        var scene = e;
        var parallaxInstance = new Parallax(scene, {
            hoverOnly: true,
        });
    });
})();

/**
 * Показать пароль функция
 */
(function showPassword() {
    if ($('.form-input_password').length) {
        $('.show-icon').on("click", function() {
            var thisInput = $(this).parent('.form-item_password').find('.form-input_password');

            if (!thisInput.hasClass('show')) {
                thisInput.addClass('show');
                thisInput.attr("type", "text");
            } else {
                thisInput.removeClass('show');
                thisInput.attr("type", "password");
            }
        });
    }
})();

/**
 * Кнопка для открытия меню
 */
$("#navBar").click(function() {
    $("#mainNav").toggleClass("responsive");
    $("#navBar").toggleClass("active");
    $("body").toggleClass("lock");
});


if ($('div').is('.clc-arrowSelect')) {
    $(".clc-arrowSelect").click(function() {
        if ($(this).hasClass('active')){
            $(this).removeClass('active')
        }
    });
}