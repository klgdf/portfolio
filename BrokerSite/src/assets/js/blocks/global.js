import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта

export function definesLanguage() {
    var pageUrl = location.pathname.split('/'), // парсим строку чтобы получить все возможные языки
        curLanguage = __CONFIG_GLOBAL.defaultLanguage; // получаем дефолтный язык
    // получаем все реальные языка сайта
    __CONFIG_GLOBAL.seolocales.alternatives.forEach( ( item ) => { // перебираем все языки из конфига
        if( pageUrl.indexOf( item ) !== -1 ) { // и ищем какой элемент из массива совпадает с элементов массива языков
            // если находим присваиваем язык и заканчиваем выполнение цикла
            curLanguage = item;
            // возвращаем найденный язык и останавливаем цикл
            return curLanguage;
        }
    });
    // если язык не был найден возвращаем дефолтный язык
    return curLanguage;
}