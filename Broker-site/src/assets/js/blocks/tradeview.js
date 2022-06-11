import { definesLanguage } from './global'; // хук для определения языка
import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта

// идентификатор контейнер для виджета (id)
var tradewidjetid = "tradeview";

/**
 * Строим виджет графика в контейнере - tradewidjetid
 */
(function addedSchedule() {
    if ($('#' + tradewidjetid).length) {
        // инструменты для каждого типа виджета указаны в файле глобальной конфигурации
        var allinst = {
                forex: __CONFIG_GLOBAL.javascript.tradeview.instruments.forex,
                metals: __CONFIG_GLOBAL.javascript.tradeview.instruments.metals,
                stocks: __CONFIG_GLOBAL.javascript.tradeview.instruments.stocks,
                commodities: __CONFIG_GLOBAL.javascript.tradeview.instruments.commodities,
                index: __CONFIG_GLOBAL.javascript.tradeview.instruments.index,
                crypto: __CONFIG_GLOBAL.javascript.tradeview.instruments.crypto
            },
            // переменная для локали виджета
            lang,
            // по атрибуту контейнера понимаем какой виджет необходимо построить
            inst = $('#' + tradewidjetid).attr('data-item');
        // определение локали для виджета
        lang = (definesLanguage() == 'zh') ? 'zh_CN' :
            (definesLanguage() == 'de') ? 'de_DE' :
            definesLanguage();
        // стройка виджета
        new TradingView.widget({
            "autosize": true,
            "symbol": allinst[inst],
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "1",
            "locale": lang,
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": tradewidjetid
        });
    }
})();