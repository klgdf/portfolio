import __SELECT_JSON from './json/select.json'; // подключение объекта со всеми странами

/**
 * Функция для создания списка стран в модальном окне обратной связи с помощью плагина select2
 */
(function addCustomSelectCountry() {
    if ($('.custom-select-wrapper').length) {
        $('#select-country').select2({
            data: __SELECT_JSON,
            dropdownParent: '.select-wrapper-country',
            tags: true,
        });
    }
})();

/**
 * Функция для создания списка языков в модальном окне обратной связи с помощью плагина select2
 */
(function addCustomSelectLang() {
    if ($('.custom-select-wrapper').length) {
        $('#select-lang').select2({
            dropdownParent: '.select-wrapper-lang',
        }).on('change', function() {
            $(this).valid();
        });
    }
})();