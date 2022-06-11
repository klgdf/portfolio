import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта

/**
 * Запуск перебора чисел
 */
(function animateNumber() {
    if ($('.counter-list').length) {
        $('.counter-list').viewportChecker({
            callbackFunction() {
                setTimeout(() => {
                    let comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
                    $('.indicator-number_1').animateNumber({
                        number: $('.indicator-number_1').data('indicator-number'),
                        numberStep: comma_separator_number_step,
                    }, {
                        easing: 'swing',
                        duration: __CONFIG_GLOBAL.javascript.about.duration,
                    });
                    $('.indicator-number_2').animateNumber({
                        number: $('.indicator-number_2').data('indicator-number'),
                        numberStep: comma_separator_number_step,
                    }, {
                        easing: 'swing',
                        duration: __CONFIG_GLOBAL.javascript.about.duration,
                    });
                    $('.indicator-number_3').animateNumber({
                        number: $('.indicator-number_3').data('indicator-number'),
                        numberStep: comma_separator_number_step,
                    }, {
                        easing: 'swing',
                        duration: __CONFIG_GLOBAL.javascript.about.duration,
                    });
                    $('.indicator-number_4').animateNumber({
                        number: $('.indicator-number_4').data('indicator-number'),
                        numberStep: comma_separator_number_step,
                    }, {
                        easing: 'swing',
                        duration: __CONFIG_GLOBAL.javascript.about.duration,
                    });
                    $('.indicator-number_5').animateNumber({
                        number: $('.indicator-number_5').data('indicator-number'),
                        numberStep: comma_separator_number_step,
                    }, {
                        easing: 'swing',
                        duration: __CONFIG_GLOBAL.javascript.about.duration,
                    });
                }, 700);
            },
        });
    }
})();