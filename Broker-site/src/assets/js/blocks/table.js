import { definesLanguage } from './global'; // хук для определения языка
import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import __TABLE_JSON from './json/table.json'; // подключение объекта с переводами и статичными значениями для таблицы

var prevobjcot = [], // здесь хранятся предидущие котировки, для определения повышиется или понижается цена открытия/закрытия
    elementTable = '.tableinsert'; // класс/идентификатор DOM блока в котором будет строиться таблица

/**
 * Функция для запроса котировок с сервера (цикличная, цикличность задается в глобальном сайте конфигурации в мс)
 * @param {*} lang 
 * @returns [function|error]
 */
function checkindex(lang) {
    if ($(elementTable).length) {
        // получаем данные о плечах в зависимости от типа аккаунта
        let leverage_accounts = __CONFIG_GLOBAL.javascript.table.accounts_type[ __CONFIG_GLOBAL.accounts_type ] !== undefined ? __CONFIG_GLOBAL.javascript.table.accounts_type[ __CONFIG_GLOBAL.accounts_type ] : __CONFIG_GLOBAL.javascript.table.accounts_type[ __CONFIG_GLOBAL.javascript.default_type_account ],
            update_table = update_json_table(__TABLE_JSON, leverage_accounts);
        // попытка запросить котировки у реального сервера сайта
        $.get('https://trade.' + __CONFIG_GLOBAL.companyData.domain + ':8887/history/quotesnapshot', {}, function(data) {
            // получить разницу интрументов
            godifrenet(__TABLE_JSON, JSON.parse(data));
            // перед тем как отправлять котировки в стройку, необходима функция для изменения статичных значений в таблице в зависимости от типа сайта (спам, холод и т.д.)
            gobuild( JSON.parse(data), update_table[ $(elementTable).attr('attr') ], $(elementTable).attr('attr'), __TABLE_JSON.langs[lang]);
        // если 404 то используем резервный сервере
        }).fail(function(){
            $.get(__CONFIG_GLOBAL.javascript.table.reservserver, {}, function(data) {
                // получить разницу интрументов
                godifrenet(__TABLE_JSON, JSON.parse(data));
                // перед тем как отправлять котировки в стройку, необходима функция для изменения статичных значений в таблице в зависимости от типа сайта (спам, холод и т.д.)
                gobuild( JSON.parse(data), update_table[ $(elementTable).attr('attr') ], $(elementTable).attr('attr'), __TABLE_JSON.langs[lang]);
            }).fail(function(){
                console.log('Прод сервер и резервный сервер не доступны или не отдают котировки');
            })
        });
    }
}

/**
 * Получить разницу интрументов, для определения инструментов, которые не отображаются в таблице
 * @param {table} Все текущие инструменты которые отображаются на сайте 
 * @param {data} Интрументы которые приходят
 */
function godifrenet(table, data) {
    let allInstrument = [
        ...table.forex,
        ...table.metals,
        ...table.stocks,
        ...table.stocks,
        ...table.commodities,
        ...table.index,
        ...table.etf,
        ...table.crypto
    ];
    allInstrument.forEach((item)=>{
        if( data[item.facktname] != 'undefined' ) {
            delete data[item.facktname];
        }
    });
    // console.log(data);
}

/**
 * Генерация таблицы под тип аккаунта, который указан в глобальном конфиге
 * @param {*} table 
 * @param {*} leverage 
 */
function update_json_table( table, leverage ) {
    Object.keys(table).forEach(function(key) {
        if (leverage[key] !== undefined) {
            table[key].forEach((item) => {
                item.fields.leverage = leverage[key];
            });
        }
    });
    return table;
}

/**
 * Функция для строительства таблицы, выполняется непосредственно после успешного выполнения
 * @param {*} obj 
 * @param {*} data 
 * @param {*} item 
 * @param {*} langs 
 * @returns [stringDom]
 */
function gobuild (obj, data, item, langs) {
    var htmlContent = '<table class="table-trade">',
        nowBlock = [],
        buildBlock = [];
    if (item == 'forex' || item == 'metals') {
        htmlContent += '<thead><th>' + langs.instrument + '</th><th>' + langs.bid + '</th><th>' + langs.ask + '</th><th>' + langs.step + '</th><th>' + langs.leverage + '</th><th>' + langs.opening + '<span>*</span></th><th>' + langs.closing + '<span>*</span></th><th>' + langs.action + '</th></thead><tbody>';
    } else if (item == 'stocks') {
        htmlContent += '<thead><th>' + langs.instrument + '</th><th>' + langs.bid + '</th><th>' + langs.ask + '</th><th>' + langs.cur + '</th><th>' + langs.volume + '</th><th>' + langs.leverage + '</th><th>' + langs.opening + '<span>*</span></th><th>' + langs.closing + '<span>*</span></th><th>'+langs.action+'</th></thead><tbody>';
    } else if (item == 'commodities' || item == 'index') {
        htmlContent += '<thead><th>' + langs.instrument + '</th><th>' + langs.bid + '</th><th>' + langs.ask + '</th><th>' + langs.volume + '</th><th>' + langs.leverage + '</th><th>' + langs.contract + '</th><th>' + langs.opening + '<span>*</span></th><th>' + langs.closing + '<span>*</span></th><th>'+langs.action+'</th></thead><tbody>';
    } else {
        htmlContent += '<thead><th>' + langs.instrument + '</th><th>' + langs.bid + '</th><th>' + langs.ask + '</th><th>' + langs.volume + '</th><th>' + langs.leverage + '</th><th>' + langs.opening + '<span>*</span></th><th>' + langs.closing + '<span>*</span></th><th>'+langs.action+'</th></thead><tbody>';
    }
    // если предидущих запросов котировок не было то заполняем массив
    if (prevobjcot.length == 0) {
        data.forEach( (itemblock) => {
            if (itemblock.facktname !== '' && typeof(obj[itemblock.facktname]) !== 'undefined') {
                if (obj[itemblock.facktname][0].Ask !== 0 && obj[itemblock.facktname][1].Bid !== 0) {
                    buildBlock.push({ instrument: itemblock.realname, ask: obj[itemblock.facktname][0].Ask, bid: obj[itemblock.facktname][1].Bid, status: 'now', fields: itemblock.fields });
                }
            }
        });
    // если же предидущие запросы котировок были, то заполняем новый массив и начинаем сравнивать расставляя классы для определение статуса цены открытия/закрытия
    } else {
        data.forEach( (itemblock) => {
            if (itemblock.facktname !== '' && typeof(obj[itemblock.facktname]) !== 'undefined') {
                if (obj[itemblock.facktname][0].Ask !== 0 && obj[itemblock.facktname][1].Bid !== 0) {
                    nowBlock.push({ instrument: itemblock.realname, ask: obj[itemblock.facktname][0].Ask, bid: obj[itemblock.facktname][1].Bid, status: 'now', fields: itemblock.fields });
                }
            }
        });
        nowBlock.forEach( (itemblock) => {
            prevobjcot.forEach( (itemobj) => {
                if (itemblock.instrument == itemobj.instrument) {
                    if (itemblock.ask == itemobj.ask) {
                        buildBlock.push({ instrument: itemblock.instrument, ask: itemblock.ask, bid: itemblock.bid, status: 'now', fields: itemblock.fields });
                    } else if (itemblock.ask > itemobj.ask) {
                        buildBlock.push({ instrument: itemblock.instrument, ask: itemblock.ask, bid: itemblock.bid, status: 'min', fields: itemblock.fields });
                    } else {
                        buildBlock.push({ instrument: itemblock.instrument, ask: itemblock.ask, bid: itemblock.bid, status: 'top', fields: itemblock.fields });
                    }
                }
            })
        });
    }
    // после сравнения присваиваем новые котировки в массив старых котировк для будущих сравнений
    prevobjcot = buildBlock;
    // создаем строку с DOM элементом
    prevobjcot.forEach( (element) => {
        htmlContent += '<tr>';
        htmlContent += '<td>' + element.instrument + '</td>';
        htmlContent += '<td><div class="ask audcad ' + element.status + '">' + element.bid + '</div></td>';
        htmlContent += '<td><div class="bid audcad ' + element.status + '">' + element.ask + '</div></td>';
        if (item == 'stocks') {
            htmlContent += '<td>' + element.fields.cur + '</td>';
        }
        if (item == 'forex' || item == 'metals') {
            htmlContent += '<td>' + element.fields.step + '</td>';
        } else {
            htmlContent += '<td>' + element.fields.volume + '</td>';
        }
        htmlContent += '<td>' + element.fields.leverage + '</td>';
        if (item == 'commodities' || item == 'index') {
            htmlContent += '<td>' + element.fields.contract + '</td>';
        }
        htmlContent += '<td>' + element.fields.opening + '</td>';
        htmlContent += '<td>' + element.fields.closing + '</td>';
        htmlContent += '<td><a class="btn btn-accent btn-sm" href="' + __CONFIG_GLOBAL.companyData.registratepage + '">' + langs.sell + '</a><a class="btn btn-main btn-sm" href="' + __CONFIG_GLOBAL.companyData.registratepage + '">' + langs.buy + '</a> </td>';
        htmlContent += '</tr>';
    })
    htmlContent += '</tbody></table>';
    // заполняем элемент таблицей
    $(elementTable).html(htmlContent);
}

/**
 * Функция для инициализации загрузки и постройки таблицы котировок
 */
function buldTables() {
    var curLanguage = definesLanguage();
    checkindex(curLanguage);
    // запускаем фукнцию в цикл с переодичность, которая указана в глобальный конфигурации сайта
    setInterval(function() {
        checkindex(curLanguage);
    }, __CONFIG_GLOBAL.javascript.table.table_freq_update);
};

buldTables();