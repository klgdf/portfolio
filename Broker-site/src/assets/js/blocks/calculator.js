import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import { definesLanguage } from './global'; // хук для определения языка

/**
 * Генерация калькулятора
 */
;
(function(window) {

    var getCalculate = {
        defaultBlock: "tradeCalculator",
        defaultLang: __CONFIG_GLOBAL.defaultLanguage,
        defaultBlockResult: "resultTrade",
        defaultCurency: "standart",
        defaultGroupInstrument: "Forex",
        defaultValueVolume: "0.01",
        defaultValuePrices: "0.000",
        defaultCurrencyValue: "USD",
        defaultInterval: null,
        defaultClickInterval: null,
        defaultTitles: {
            ru: {
                globalTitle: "Калькулятор трейдера",
                group_instrument: "Группа инструментов",
                type_account: "Тип счета",
                account_currency: "Валюта счета",
                leverage: "Кредитное плечо",
                instrument: "Группа инструментов",
                order_transaction_volume: "Объем сделки",
                type_order: "Направление",
                price_open: "Цена открытия",
                price_close: "Цена закрытия",
                standart: "Стандартный",
                gold: "Золотой",
                bitcoin: "Bitcoin",
                submitBtn: "Рассчитать",
                resetBtn: "Очистить",
                in: "в ",
                swop: "Своп",
                inpoints: "пунктах",
                margin: "Маржа",
                profit: "Прибыль ",
                accParametrs: "Параметры счета",
                posParametrs: "Параметры позиции",
                resultText: "Сопоставьте возможные результаты торговой стратегии с исходными данными"
            },
            en: {
                globalTitle: "Trader's calculator",
                group_instrument: "Instrument group",
                type_account: "Account type",
                account_currency: "Account currency",
                leverage: "Leverage",
                instrument: "Instrument",
                order_transaction_volume: "Volume",
                type_order: "Type of order",
                price_open: "Opening price",
                price_close: "Closing price",
                standart: "Standart",
                gold: "Gold",
                bitcoin: "Bitcoin",
                submitBtn: "Calculate",
                resetBtn: "Clear",
                in: "in ",
                swop: "Swap",
                inpoints: "points",
                margin: "Margin",
                profit: "Profit ",
                accParametrs: "Account Settings",
                posParametrs: "Position Parameters",
                resultText: "Compare the possible results of a trading strategy with the source data"
            },
            es: {
                globalTitle: "Calculadora del comerciante",
                group_instrument: "Grupo de instrumentos",
                type_account: "Tipo de cuenta",
                account_currency: "Cuenta de dinero",
                leverage: "Apalancamiento",
                instrument: "Instrumento",
                order_transaction_volume: "Volumen",
                type_order: "Tipo de orden",
                price_open: "Precio de apertura",
                price_close: "Precio de cierre",
                standart: "Estándar",
                gold: "Oro",
                bitcoin: "Bitcoin",
                submitBtn: "Calcular",
                resetBtn: "Claro",
                in: "en ",
                swop: "Swap",
                inpoints: "puntos",
                margin: "Margen",
                profit: "Lucro ",
                accParametrs: "Configuración de la cuenta",
                posParametrs: "Parámetros de posición",
                resultText: "Compare los posibles resultados de una estrategia comercial con los datos de origen"
            },
            de: {
                globalTitle: "Rechner des Händlers",
                group_instrument: "Instrumentgruppe",
                type_account: "Konto Typ",
                account_currency: "Kontowährung",
                leverage: "Hebelwirkung",
                instrument: "Instrument",
                order_transaction_volume: "Transaktionsvolumen",
                type_order: "Art der Bestellung",
                price_open: "Eröffnungskurs",
                price_close: "Schlusskurs",
                standart: "Standard",
                gold: "Gold",
                bitcoin: "Bitcoin",
                submitBtn: "Berechnung",
                resetBtn: "Klar",
                in: "in ",
                swop: "Swap",
                inpoints: "punkten",
                margin: "Margin",
                profit: "Profitieren ",
                accParametrs: "Kontoeinstellungen",
                posParametrs: "Positionsparameter",
                resultText: "Vergleichen Sie die möglichen Ergebnisse einer Handelsstrategie mit den Quelldaten"
            },
            fr: {
                globalTitle: "Calculatrice du commerçant",
                group_instrument: "Groupe d'instruments",
                type_account: "Type de compte",
                account_currency: "Devise du compte",
                leverage: "Influence",
                instrument: "Instrument",
                order_transaction_volume: "Volume",
                type_order: "Type de commande",
                price_open: "Prix ​​d'ouverture",
                price_close: "Le dernier prix",
                standart: "La norme",
                gold: "Or",
                bitcoin: "Bitcoin",
                submitBtn: "Calculer",
                resetBtn: "Clair",
                in: "en ",
                swop: "Swap",
                inpoints: "points",
                margin: "Marge",
                profit: "Profit ",
                accParametrs: "Paramètres du compte",
                posParametrs: "Paramètres de position",
                resultText: "Comparez les résultats possibles d'une stratégie de trading avec les données source"
            },
            it: {
                globalTitle: "Calcolatrice del commerciante",
                group_instrument: "Gruppo di utensili",
                type_account: "Tipo di account",
                account_currency: "Valuta dell'account",
                leverage: "Leva",
                instrument: "Strumento",
                order_transaction_volume: "Volume",
                type_order: "Tipo di ordine",
                price_open: "Prezzo di apertura",
                price_close: "Prezzo di chiusura",
                standart: "Standard",
                gold: "Oro",
                bitcoin: "Bitcoin",
                submitBtn: "Calcolare",
                resetBtn: "Chiaro",
                in: "in ",
                swop: "Swap",
                inpoints: "punti",
                margin: "Margine",
                profit: "Profitto ",
                accParametrs: "Impostazioni account",
                posParametrs: "Parametri di posizione",
                resultText: "Confronta i possibili risultati di una strategia di trading con i dati di origine"
            },
            cn: {
                globalTitle: "交易者的計算器",
                group_instrument: "工具組",
                type_account: "帳戶類型",
                account_currency: "賬戶幣種",
                leverage: "槓桿作用",
                instrument: "工具",
                order_transaction_volume: "交易量",
                type_order: "訂單類型",
                price_open: "開盤價",
                price_close: "收盤價",
                standart: "標準",
                gold: "金",
                bitcoin: "比特幣",
                submitBtn: "計算",
                resetBtn: "明確",
                in: "以",
                swop: "交換",
                inpoints: "點為單位",
                margin: "餘量",
                profit: "利潤 ",
                accParametrs: "帳戶設置",
                posParametrs: "位置參數",
                resultText: "將交易策略的可能結果與源數據進行比較"
            }
        },
        currency: {
            standart: ['USD', 'EUR'],
            gold: ['XAU'],
            bitcoin: ['BTC']
        },
        lots: {
            'Forex': 100000,
            'Cryptocurrencies': 100000,
            'Metals': 100,
            'Stocks': 1,
            'Indices': 1,
            'ETFs': 1,
            'Commodities': 1
        },
        leverage: ['1:1', '1:10', '1:20', '1:50', '1:100', '1:200', '1:500'],
        groupInstrument: ['Forex', 'Metals', 'Stocks', 'Commodities', 'Indices', 'ETFs', 'Cryptocurrencies'],
        lot_size: 100000,
        rates: [
            { id: "AUD/USD", rate: 0.78503 },
            { id: "CAD/USD", rate: 0.79389 },
            { id: "CHF/USD", rate: 1.06546 },
            { id: "EUR/USD", rate: 1.22957 },
            { id: "GBP/USD", rate: 1.38373 },
            { id: "NZD/USD", rate: 0.72515 },
            { id: "XAU/USD", rate: 1323.74 },
            { id: "JPY/USD", rate: 0.00920422 },
            { id: "RUB/USD", rate: 0.0172986 },
            { id: "SGD/USD", rate: 0.755741 },
            { id: "AUD/EUR", rate: 0.63855 },
            { id: "CAD/EUR", rate: 0.64565 },
            { id: "CHF/EUR", rate: 0.86653 },
            { id: "GBP/EUR", rate: 1.12555 },
            { id: "NZD/EUR", rate: 0.58981 },
            { id: "USD/EUR", rate: 0.81343 },
            { id: "XAU/EUR", rate: 1076.94 },
            { id: "JPY/EUR", rate: 0.00748760 },
            { id: "RUB/EUR", rate: 0.0140722 },
            { id: "SGD/EUR", rate: 0.614767 },
            { id: "AUD/RUB", rate: 45.4063 },
            { id: "CAD/RUB", rate: 45.9029 },
            { id: "CHF/RUB", rate: 61.6150 },
            { id: "EUR/RUB", rate: 71.0994 },
            { id: "GBP/RUB", rate: 80.0089 },
            { id: "NZD/RUB", rate: 41.9311 },
            { id: "USD/RUB", rate: 57.8167 },
            { id: "USD/RUB", rate: 76544.40 },
            { id: "JPY/RUB", rate: 0.532076 },
            { id: "SGD/RUB", rate: 43.6813 },
            { id: "AUD/XAU", rate: 0.000593008 },
            { id: "CAD/XAU", rate: 0.000599673 },
            { id: "CHF/XAU", rate: 0.000804846 },
            { id: "EUR/XAU", rate: 0.000928712 },
            { id: "GBP/XAU", rate: 0.00104506 },
            { id: "NZD/XAU", rate: 0.000547747 },
            { id: "USD/XAU", rate: 0.000755561 },
            { id: "JPY/XAU", rate: 0.00000695975 },
            { id: "RUB/XAU", rate: 0.0000130794 },
            { id: "SGD/XAU", rate: 0.000571323 },
            { id: "AUD/BTC", rate: 0.0000890939 },
            { id: "CAD/BTC", rate: 0.0000899434 },
            { id: "CHF/BTC", rate: 0.000120827 },
            { id: "EUR/BTC", rate: 0.000139361 },
            { id: "GBP/BTC", rate: 0.000156835 },
            { id: "NZD/BTC", rate: 0.0000822299 },
            { id: "USD/BTC", rate: 0.000113407 },
            { id: "XAU/BTC", rate: 0.150024 },
            { id: "JPY/BTC", rate: 0.00000103995 },
            { id: "RUB/BTC", rate: 0.00000195446 },
            { id: "SGD/BTC", rate: 0.0000853421 }
        ],
        allInstruments: {
            Forex: [{
                    id: "AUD/CAD",
                    name: '',
                    type: 'standard',
                    swapSell: -2.03,
                    swapBuy: -1.82,
                    commission: 0.00004,
                    quotationCurrency: "CAD"
                },
                {
                    id: "AUD/CHF",
                    name: '',
                    type: 'standard',
                    swapSell: -4.34,
                    swapBuy: 0.48,
                    commission: 0.00004,
                    quotationCurrency: "CHF"
                },
                {
                    id: "AUD/JPY",
                    name: '',
                    type: 'standard',
                    swapSell: -4.02,
                    swapBuy: 0.27,
                    commission: 0.00004,
                    quotationCurrency: "JPY"
                },
                {
                    id: "AUD/NZD",
                    name: '',
                    type: 'standard',
                    swapSell: -1.43,
                    swapBuy: -2.9,
                    commission: 0.00004,
                    quotationCurrency: "NZD"
                },
                {
                    id: "AUD/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -2,
                    swapBuy: -1.82,
                    commission: 0.00004,
                    quotationCurrency: "USD"
                },
                {
                    id: "CAD/CHF",
                    name: '',
                    type: 'standard',
                    swapSell: -4.13,
                    swapBuy: 0.27,
                    commission: 0.00004,
                    quotationCurrency: "CHF"
                },
                {
                    id: "CAD/JPY",
                    name: '',
                    type: 'standard',
                    swapSell: -3.41,
                    swapBuy: -0.38,
                    commission: 0.00004,
                    quotationCurrency: "JPY"
                },
                {
                    id: "CHF/JPY",
                    name: '',
                    type: 'standard',
                    swapSell: -1.18,
                    swapBuy: -2.55,
                    commission: 0.00004,
                    quotationCurrency: "JPY"
                },
                {
                    id: "EUR/AUD",
                    name: '',
                    type: 'standard',
                    swapSell: 0.61,
                    swapBuy: -4.26,
                    commission: 0.00004,
                    quotationCurrency: "AUD"
                },
                {
                    id: "EUR/CAD",
                    name: '',
                    type: 'standard',
                    swapSell: -0.03,
                    swapBuy: -3.72,
                    commission: 0.00004,
                    quotationCurrency: "CAD"
                },
                {
                    id: "EUR/CHF",
                    name: '',
                    type: 'standard',
                    swapSell: -2.69,
                    swapBuy: -0.97,
                    commission: 0.00004,
                    quotationCurrency: "CHF"
                },
                {
                    id: "EUR/GBP",
                    name: '',
                    type: 'standard',
                    swapSell: -0.92,
                    swapBuy: -2.79,
                    commission: 0.00004,
                    quotationCurrency: "GBP"
                },
                {
                    id: "EUR/JPY",
                    name: '',
                    type: 'standard',
                    swapSell: -1.69,
                    swapBuy: -1.94,
                    commission: 0.00004,
                    quotationCurrency: "JPY"
                },
                {
                    id: "EUR/NZD",
                    name: '',
                    type: 'standard',
                    swapSell: 0.8,
                    swapBuy: -4.5,
                    commission: 0.00004,
                    quotationCurrency: "NZD"
                },
                {
                    id: "EUR/USD",
                    name: '',
                    type: 'standard',
                    swapSell: 0.37,
                    swapBuy: -3.99,
                    commission: 0.00004,
                    quotationCurrency: "USD"
                },
                {
                    id: "GBP/AUD",
                    name: '',
                    type: 'standard',
                    swapSell: -0.39,
                    swapBuy: -3.35,
                    commission: 0.00004,
                    quotationCurrency: "AUD"
                },
                {
                    id: "GBP/CAD",
                    name: '',
                    type: 'standard',
                    swapSell: -1.04,
                    swapBuy: -2.83,
                    commission: 0.00004,
                    quotationCurrency: "CAD"
                },
                {
                    id: "GBP/CHF",
                    name: '',
                    type: 'standard',
                    swapSell: -3.15,
                    swapBuy: -0.59,
                    commission: 0.00004,
                    quotationCurrency: "CHF"
                },
                {
                    id: "GBP/JPY",
                    name: '',
                    type: 'standard',
                    swapSell: -1.89,
                    swapBuy: -1.96,
                    commission: 0.00004,
                    quotationCurrency: "JPY"
                },
                {
                    id: "GBP/NZD",
                    name: '',
                    type: 'standard',
                    swapSell: -0.19,
                    swapBuy: -3.61,
                    commission: 0.00004,
                    quotationCurrency: "NZD"
                },
                {
                    id: "GBP/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -0.52,
                    swapBuy: -3.14,
                    commission: 0.00004,
                    quotationCurrency: "USD"
                },
                {
                    id: "NZD/CAD",
                    name: '',
                    type: 'standard',
                    swapSell: -2.81,
                    swapBuy: -1.15,
                    commission: 0.00004,
                    quotationCurrency: "CAD"
                },
                {
                    id: "NZD/CHF",
                    name: '',
                    type: 'standard',
                    swapSell: -5.26,
                    swapBuy: 0.86,
                    commission: 0.00004,
                    quotationCurrency: "CHF"
                },
                {
                    id: "NZD/JPY",
                    name: '',
                    type: 'standard',
                    swapSell: -4.28,
                    swapBuy: 0.49,
                    commission: 0.00004,
                    quotationCurrency: "JPY"
                },
                {
                    id: "NZD/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -2.75,
                    swapBuy: -1.1,
                    commission: 0.00004,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/CAD",
                    name: '',
                    type: 'standard',
                    swapSell: -2.21,
                    swapBuy: -1.44,
                    commission: 0.00004,
                    quotationCurrency: "CAD"
                },
                {
                    id: "USD/CHF",
                    name: '',
                    type: 'standard',
                    swapSell: -4.01,
                    swapBuy: 0.36,
                    commission: 0.00004,
                    quotationCurrency: "CHF"
                },
                {
                    id: "USD/JPY",
                    name: '',
                    type: 'standard',
                    swapSell: -3.23,
                    swapBuy: -0.52,
                    commission: 0.00004,
                    quotationCurrency: "JPY"
                },
                {
                    id: "USD/RUB",
                    name: '',
                    type: 'standard',
                    swapSell: -0.13,
                    swapBuy: -37.06,
                    commission: 0.00004,
                    quotationCurrency: "RUB"
                },
                {
                    id: "USD/SGD",
                    name: '',
                    type: 'standard',
                    swapSell: -3.24,
                    swapBuy: -1.92,
                    commission: 0.00004,
                    quotationCurrency: "SGD"
                }
            ],
            Metals: [{
                id: 'XAU/USD',
                name: '',
                type: 'metals',
                swapSell: '-1.11',
                swapBuy: '-4.63',
                commission: 0.00004,
                quotationCurrency: "USD"
            }],
            Stocks: [{
                    id: "Alcoa Corp",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.22,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Altaba (Yahoo)",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.28,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Apple Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.79,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Admiral Group",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.12,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Adidas",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.97,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "American International Group Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.44,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Airbus Group",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.43,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Amazon.com Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -5.32,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Tatneft",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.28,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Aviva PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.03,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "American Express Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.51,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Boeing Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.04,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Bank of America Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.15,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Barclays PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.02,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "British American Tobacco",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.3,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Bayer",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.66,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Bankia",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.01,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "BMW",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.57,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Danone",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.39,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Burberry Group",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.1,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Centrica PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.02,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Caterpillar Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.62,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Severstal",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.61,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Continental",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.24,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Cisco Systems Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.2,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Chevron Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.77,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "EI du Pont de Nemours and Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.48,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Walt Disney Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.71,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Deutsche Post",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.21,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Deutsche Telekom",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.11,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "eBay Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.2,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Freeport-McMoran Copper & Gold Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.1,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "FedEx Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.84,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Total",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.32,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Gas Natural SDG",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.12,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Gazprom",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.01,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "General Electric Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.21,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Glencore PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.02,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Norilskiy Nickel",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.53,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Alphabet Inc C",
                    name: '',
                    type: 'stocks',
                    swapSell: -5.28,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "GlaxoSmitdKline PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.1,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "tde Goodyear Tire & Rubber Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.69,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Halliburton Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.36,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Home Depot Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.89,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Henkel & Co KGaA",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.75,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "HP Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.1,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "International Business Machines",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.1,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Intel Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.24,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "International Paper Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.35,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Johnson & Johnson",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.76,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "JPMorgan Chase & Co",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.55,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Coca-Cola Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.27,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Kraton Performance Polymers",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.75,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Legal & General Group PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.02,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Lukoil",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.85,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Lloyds Banking Group PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.01,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Mapfre",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.02,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Moet Henenssy Louis Vuitton",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.15,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "McDonalds Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.8,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Magnit",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.25,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "3M Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.17,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Altria Group",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.45,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Merck & Company Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.4,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Microsoft Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.41,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Mechel preferred",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.54,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "L'Oreal",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.11,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Oracle Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.26,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "PepsiCo Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.67,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Pfizer Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.21,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Procter & Gamble Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.56,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Polus Zoloto",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.55,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Prudential PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.1,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Qualcomm Incorporated",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.42,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Royal Bank of Scotland Group PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.01,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Repsol",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.09,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Renault",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.56,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Rosneft",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.59,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Rolls-Royce Holdings",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.05,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Rostelecom",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.38,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Sberbank",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.09,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "J Sainsbury PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.02,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Starbucks Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.38,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Gazprom Neft",
                    name: '',
                    type: 'stocks',
                    swapSell: -1.51,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Siemens",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.77,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Schneider Electric",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.44,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "AT&T Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.27,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Telefonica SA",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.06,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "Tesco PLC",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.01,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "Tesla",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.34,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Peugeot",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.11,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "United Parcel Service Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.75,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Uralkaliy",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.74,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "United Technologies Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.72,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Visa Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.53,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Volkswagen",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.96,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "VTB Bank",
                    name: '',
                    type: 'stocks',
                    swapSell: -2.49,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "Verizon Communications Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.35,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Wells Fargo & Company",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.35,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Wal-Mart Stores Inc",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.45,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Exxon Mobil Corporation",
                    name: '',
                    type: 'stocks',
                    swapSell: -0.57,
                    swapBuy: 0,
                    commission: 0.02,
                    quotationCurrency: "USD"
                }
            ],
            Commodities: [{
                    id: "Brent Crude Oil",
                    name: '',
                    type: 'commodities',
                    swapSell: 1.09,
                    swapBuy: -3.56,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "WTI Crude Oil",
                    name: '',
                    type: 'commodities',
                    swapSell: 1.9,
                    swapBuy: -3.56,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Natural Gas",
                    name: '',
                    type: 'commodities',
                    swapSell: 0.05,
                    swapBuy: -0.38,
                    commission: 0.02,
                    quotationCurrency: "USD"
                }
            ],
            Indices: [{
                    id: "CAC40",
                    name: '',
                    type: 'indices',
                    swapSell: -0.42,
                    swapBuy: -0.36,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "DAX30",
                    name: '',
                    type: 'indices',
                    swapSell: -1.88,
                    swapBuy: -1.13,
                    commission: 0.02,
                    quotationCurrency: "EUR"
                },
                {
                    id: "FTSE100",
                    name: '',
                    type: 'indices',
                    swapSell: -2,
                    swapBuy: -3,
                    commission: 0.02,
                    quotationCurrency: "GBP"
                },
                {
                    id: "DJI30",
                    name: '',
                    type: 'indices',
                    swapSell: -2,
                    swapBuy: -3.1,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "NDX100",
                    name: '',
                    type: 'indices',
                    swapSell: -2.1,
                    swapBuy: -3,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "SPX500",
                    name: '',
                    type: 'indices',
                    swapSell: -2,
                    swapBuy: -3.2,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "NKY225",
                    name: '',
                    type: 'indices',
                    swapSell: -0.9,
                    swapBuy: -2.5,
                    commission: 0.02,
                    quotationCurrency: "JPY"
                },
                {
                    id: "MCX",
                    name: '',
                    type: 'indices',
                    swapSell: -2.2,
                    swapBuy: -3,
                    commission: 0.02,
                    quotationCurrency: "RUB"
                },
                {
                    id: "RTS",
                    name: '',
                    type: 'indices',
                    swapSell: -2,
                    swapBuy: -3.2,
                    commission: 0.02,
                    quotationCurrency: "USD"
                }
            ],
            ETFs: [{
                    id: "iPath S&P 500",
                    name: '',
                    type: 'etf',
                    swapSell: -2,
                    swapBuy: -3.2,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "Samsung",
                    name: '',
                    type: 'etf',
                    swapSell: -1.9,
                    swapBuy: -3.1,
                    commission: 0.02,
                    quotationCurrency: "USD"
                }
            ],
            Cryptocurrencies: [{
                    id: "BTC/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "XRP/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "LTC/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "BCH/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "ZEC/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "XMR/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "ETH/USD",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/BTC",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/XRP",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/LTC",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/BCH",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/ZEC",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/XMR",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                },
                {
                    id: "USD/ETH",
                    name: '',
                    type: 'standard',
                    swapSell: -50,
                    swapBuy: -3.5,
                    commission: 0.02,
                    quotationCurrency: "USD"
                }
            ]
        },
        numberChange: function(element) {
            var dolya = Number(element.getAttribute('dolya')),
                valueInput = element.value.replace(/[^0-9\.]/g, '');
            valueInput = Number(valueInput).toFixed(dolya);
            valueInput = valueInput.replace(/,/, '.');
            clearTimeout(this.defaultInterval);
            this.defaultInterval = setTimeout(function() { element.value = valueInput; }, 10000);
        },
        selectTypeAccount: function(value) {
            var selectElement = document.getElementById('_account_currency');
            var buildElements = this.takeObjClass('_account_currency_build');
            selectElement.setAttribute("value-data", this.currency[value.toLowerCase()][0]);
            selectElement.value = this.currency[value.toLowerCase()][0];
            buildElements[0].innerHTML = this.buildOptions(this.currency[value.toLowerCase()], '_account_currency', 3);
        },
        selectGroupInstrument: function(value) {
            var selectElement = document.getElementById('_instrument');
            var buildElements = this.takeObjClass('_instrument_build');
            selectElement.setAttribute("value-data", this.allInstruments[value][0].id);
            selectElement.value = this.allInstruments[value][0].id;
            buildElements[0].innerHTML = this.buildOptionsInstrument(value, '_instrument', 3);
        },
        editInput: function(element) {
            this.defaultClickInterval = setInterval(this.stepsEdit, 50, element);
        },
        stopeditInput: function() {
            clearInterval(this.defaultClickInterval);
        },
        stepsEdit: function(element) {
            var inputField = element.parentNode.getElementsByTagName('input')[0],
                newValue = 0,
                dolya = Number(inputField.getAttribute('dolya'));
            if (element.innerText == '+') {
                newValue = Number(inputField.value) + Number(inputField.step);
            } else {
                newValue = Number(inputField.value) - Number(inputField.step);
            }
            newValue = (newValue < Number(inputField.min)) ? Number(inputField.min) : newValue;
            newValue = (newValue > Number(inputField.max)) ? Number(inputField.max) : newValue;
            inputField.value = newValue.toFixed(dolya).replace(/[^0-9\.]/g, '').replace(/,/, '.');
        },
        cleanAll: function(langBuild) {
            if (this.takeObjClass('clc-tradeCalculator').length > 0) {
                var _group_instrument = document.getElementById('_group_instrument'),
                    _type_account = document.getElementById('_type_account'),
                    _account_currency = document.getElementById('_account_currency'),
                    _leverage = document.getElementById('_leverage'),
                    _instrument = document.getElementById('_instrument'),
                    _tr_order_transaction_volume = document.getElementById('_tr_order_transaction_volume'),
                    _tr_price_open = document.getElementById('_tr_price_open'),
                    _tr_price_close = document.getElementById('_tr_price_close');

                _group_instrument.value = this.groupInstrument[0];
                _group_instrument.setAttribute("value-data", this.groupInstrument[0]);

                _type_account.value = this.defaultTitles[langBuild].standart;
                _type_account.setAttribute("value-data", this.defaultTitles.en.standart);

                _leverage.value = this.leverage[0];
                _leverage.setAttribute("value-data", this.leverage[0]);

                _account_currency.value = this.currency[this.defaultCurency][0];
                _account_currency.setAttribute("value-data", this.currency[this.defaultCurency][0]);

                _instrument.value = this.allInstruments[this.defaultGroupInstrument][0].id;
                _instrument.setAttribute("value-data", this.allInstruments[this.defaultGroupInstrument][0].id);

                var buildElements1 = this.takeObjClass('_instrument_build');
                buildElements1[0].innerHTML = this.buildOptionsInstrument(this.defaultGroupInstrument, '_instrument', 3);

                var buildElements2 = this.takeObjClass('_account_currency_build');
                buildElements2[0].innerHTML = this.buildOptions(this.currency[this.defaultCurency], '_instrument', 3);

                _tr_order_transaction_volume.value = this.defaultValueVolume;
                _tr_price_open.value = this.defaultValuePrices;
                _tr_price_close.value = this.defaultValuePrices;
                this.cleanResult();
                return false;
            } else {
                return this.getError('Блок калькулятора не найден!');
            }
        },
        cleanResult: function() {
            var resultBox = this.takeObjClass('#clc-tableResults clc-tableResults'),
                currencyBlocks = this.takeObjClass('__tr_val_switch');
            for (var i = 0; i < currencyBlocks.length; i++) {
                currencyBlocks[i].innerHTML = this.defaultCurrencyValue;
            }
            if (resultBox.length > 0) resultBox[0].remove();
            return false;
        },
        takeObjClass: function(classFind) {
            var allElem, arrE = [],
                i;
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(classFind);
            } else if (document.querySelectorAll) {
                return document.querySelectorAll("." + FindClass);
            }
            allElem = document.body.getElementsByTagName('*');
            i = allElem.length;
            while (i--) {
                if (allElem[i].className == FindClass) arrE.push(allElem[i]);
            };
            return arrE;
        },
        destructPreloader: function() {
            var preloader = this.takeObjClass('clc-preloader');
            setTimeout(function() {
                preloader[0].classList.remove('clc-showPreloader');
            }, 1000);
        },
        buildOptions: function(data, className, funct) {
            var optionsHtml = '';
            for (var i = 0; i < data.length; i++) {
                optionsHtml += '<li onclick="getCalculate.selectit(this,' + funct + ')" for="' + className + '" class="' + className + '" value="' + data[i] + '">' + data[i] + '</li>';
            }
            return optionsHtml;
        },
        buildOptionsInstrument: function(data, className, funct) {
            var optionsHtml = '';
            for (var i = 0; i < this.allInstruments[data].length; i++) {
                optionsHtml += '<li onclick="getCalculate.selectit(this,' + funct + ')" for="' + className + '" class="' + className + '" value="' + this.allInstruments[data][i].id + '">' + this.allInstruments[data][i].id + '</li>';
            }
            return optionsHtml;
        },
        getcurrentInstrumentElement: function(group, instrument, element) {
            var ObjInstrument = this.allInstruments[group];
            for (var i = 0; i < ObjInstrument.length; i++) {
                if (ObjInstrument[i].id == instrument) {
                    return ObjInstrument[i][element];
                }
            }
        },
        getThisRate: function(currentInstrument, accountCurrency, instrument) {
            var ObjInstrument = this.allInstruments[currentInstrument],
                rateInstrument,
                thisrate = 1,
                thisquotationCurrency = this.getcurrentInstrumentElement(currentInstrument, instrument, 'quotationCurrency');
            if (thisquotationCurrency !== accountCurrency) {
                rateInstrument = thisquotationCurrency + "/" + accountCurrency;
                for (var i = 0; i < this.rates.length; i++) {
                    if (this.rates[i].id == rateInstrument) {
                        thisrate = this.rates[i].rate;
                    }
                }
            } else {
                thisrate = 1;
            }
            return Number(thisrate);
        },
        setCalculator: function(data) {
            var currentInstrument = this.allInstruments[data.group],
                commission = this.getcurrentInstrumentElement(data.group, data.instrument, 'commission'),
                rate = this.getThisRate(data.group, data.currency, data.instrument),
                quotedCurrency = this.getcurrentInstrumentElement(data.group, data.instrument, 'quotationCurrency'),
                trendDirection = data.price_open - data.price_close > 0 ? "DOWN" : "UP",
                ACCURACY = 5,
                LOTSIZE = Number(this.lots[data.group]),
                point = 0.0001,
                profit = +(Math.abs(data.price_close - data.price_open) * rate * data.volume * LOTSIZE).toFixed(ACCURACY),
                commission = +(profit * commission).toFixed(ACCURACY),
                volume;
            data.swapBuy = +this.getcurrentInstrumentElement(data.group, data.instrument, 'swapBuy');
            data.swapSell = +this.getcurrentInstrumentElement(data.group, data.instrument, 'swapSell');
            volume = data.volume.toFixed(ACCURACY);

            var swapBuy = (LOTSIZE * volume * point) * rate * data.swapBuy / 10,
                swapSell = (LOTSIZE * volume * point) * rate * data.swapSell / 10;

            if (data.typeorder === "Buy") {
                data.currentSwap = data.swapBuy;
                data.currentSwapAccountCurrency = swapBuy;
                if (trendDirection === "UP") {
                    data.profit = profit - commission + swapBuy;
                } else {
                    data.profit = -profit - commission + swapBuy;
                }
            } else {
                data.currentSwap = data.swapSell;
                data.currentSwapAccountCurrency = swapSell;
                if (trendDirection === "UP") {
                    data.profit = -profit - commission + swapSell;
                } else {
                    data.profit = profit - commission + swapSell;
                }
            }
            return data;
        },
        closestEl: function(el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
        selectit: function(el, funct) {
            console.log(el.innerText);
            var elementThis = document.getElementById(el.getAttribute('for'));
            elementThis.value = el.innerText;
            elementThis.setAttribute("value-data", el.getAttribute('value'));
            switch (funct) {
                case 1:
                    this.selectTypeAccount(el.getAttribute('value'));
                    break;
                case 2:
                    this.selectGroupInstrument(el.getAttribute('value'));
                    break;
                default:
                    break;
            }
        },
        resetSelect: function(el) {
            var varsSUB = this.takeObjClass(el.getAttribute("id"));
            for (var i = 0; i < varsSUB.length; i++) {
                varsSUB[i].classList.remove('__tr_hide');
            }
            el.nextElementSibling.classList.add('active')
        },
        findValue: function(el) {
            var varsSUB = this.takeObjClass(el.getAttribute("id")),
                textSUB = [],
                newSUB = [];
            for (var i = 0; i < varsSUB.length; i++) {
                varsSUB[i].classList.remove('__tr_hide');
                textSUB.push(varsSUB[i].innerText.toLowerCase());
            }
            if (!this.getFindDiff(textSUB, el.value)) {
                newSUB = this.getFindDiffDef(textSUB, el.value.toLowerCase());
                if (newSUB.length != 0) {
                    for (var i = 0; i < varsSUB.length; i++) {
                        if (!this.getFindDiff(newSUB, varsSUB[i].innerText)) {
                            varsSUB[i].classList.add('__tr_hide');
                        }
                    }
                }
            } else {
                for (var i = 0; i < varsSUB.length; i++) {
                    if (varsSUB[i].innerText.toLowerCase() == el.value.toLowerCase()) {
                        varsSUB[i].click();
                    }
                }
            }
        },
        getFindDiff: function(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].toLowerCase() == val.toLowerCase()) return true;
            }
            return false;
        },
        getFindDiffDef: function(arr, val) {
            var textval = val.split(''),
                returnArrya = [];
            for (var i = 0; i < arr.length; i++) {
                var textmass = arr[i].split(''),
                    newtext = '';
                for (var j = 0; j < textval.length; j++) {
                    if (textmass[j] !== 'undefined') {
                        newtext += textmass[j];
                    }
                }
                if (newtext == val) {
                    returnArrya.push(arr[i]);
                }
            }
            return returnArrya;
        },
        getBuild: function(lang, idBlock) {
            var buttonPlusPC = '<button class="clc-controlBox__button clc-controlBox__button--max" onmousedown="getCalculate.editInput(this);" onmouseup="getCalculate.stopeditInput(this);">+</button>';
            var buttonMinusPC = '<button class="clc-controlBox__button clc-controlBox__button--min" onmousedown="getCalculate.editInput(this);" onmouseup="getCalculate.stopeditInput(this);">-</button>';
            var buttonPlusGad = '<button class="clc-controlBox__button clc-controlBox__button--max" onclick="getCalculate.stepsEdit(this);">+</button>';
            var buttonMinusGad = '<button class="clc-controlBox__button clc-controlBox__button--min" onclick="getCalculate.stepsEdit(this);">-</button>';
            var buttonMinus = '';
            var buttonPlus = '';
            var langBuild = (lang) ? lang : this.defaultLang;
            var blockBuild = (idBlock) ? idBlock : this.defaultBlock;
            var mainBlock = document.getElementById(blockBuild);
            if (mainBlock) {
                this.getDestroy(blockBuild);
                if (this.defaultTitles[lang]) {
                    // создаем базовый класс для конструктора
                    mainBlock.classList.add('clc-tradeCalculator');
                    // создаем блок прелоадера и добавляем его в конец блока
                    var preloader = document.createElement('div');
                    preloader.className = 'clc-preloader clc-showPreloader';
                    preloader.innerHTML = '<span></span>';
                    mainBlock.append(preloader);
                    // определяем устройство
                    if (window.innerWidth < 800) {
                        buttonMinus = buttonMinusGad;
                        buttonPlus = buttonPlusGad;
                    } else {
                        buttonMinus = buttonMinusPC;
                        buttonPlus = buttonPlusPC;
                    }
                    // создаем основной блок калькулятора 
                    console.log(buttonMinus);
                    console.log(buttonPlus);
                    var mainContent = document.createElement('div');
                    var innerHTMLcontent = '<div class="clc-calculator">';
                    innerHTMLcontent += '<section class="clc-accountSettings clc-calculator__section">';
                    innerHTMLcontent += '<h3 class="clc-calculator__heading">' + this.defaultTitles[langBuild].accParametrs + ': </h3>';
                    innerHTMLcontent += '<div class="clc-calculator__row">';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].group_instrument + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_group_instrument" value="' + this.groupInstrument[0] + '" value-data="' + this.groupInstrument[0] + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field">' + this.buildOptions(this.groupInstrument, '_group_instrument', 2) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].type_account + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_type_account" value="' + this.defaultTitles[langBuild].standart + '" value-data="' + this.defaultTitles.en.standart + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field">';
                    innerHTMLcontent += '<li onclick="getCalculate.selectit(this,1)" for="_type_account" class="_type_account" value="' + this.defaultTitles.en.standart + '">' + this.defaultTitles[langBuild].standart + '</li>';
                    innerHTMLcontent += '<li onclick="getCalculate.selectit(this,1)" for="_type_account" class="_type_account" value="' + this.defaultTitles.en.gold + '">' + this.defaultTitles[langBuild].gold + '</li>';
                    innerHTMLcontent += '<li onclick="getCalculate.selectit(this,1)" for="_type_account" class="_type_account" value="' + this.defaultTitles.en.bitcoin + '">' + this.defaultTitles[langBuild].bitcoin + '</li>';
                    innerHTMLcontent += '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].account_currency + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_account_currency" value="' + this.currency[this.defaultCurency][0] + '" value-data="' + this.currency[this.defaultCurency][0] + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field _account_currency_build">' + this.buildOptions(this.currency[this.defaultCurency], '_account_currency', 3) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].leverage + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_leverage" value="' + this.leverage[0] + '" value-data="' + this.leverage[0] + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field">' + this.buildOptions(this.leverage, '_leverage', 3) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</section>';

                    innerHTMLcontent += '<section class="clc-positionParameters clc-calculator__section">';
                    innerHTMLcontent += '<h3 class="clc-calculator__heading">' + this.defaultTitles[langBuild].posParametrs + ': </h3>';
                    innerHTMLcontent += '<div class="clc-calculator__row">';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].instrument + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_instrument" value="' + this.allInstruments[this.defaultGroupInstrument][0].id + '" value-data="' + this.allInstruments[this.defaultGroupInstrument][0].id + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field _instrument_build">' + this.buildOptionsInstrument(this.defaultGroupInstrument, '_instrument', 3) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--control">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].order_transaction_volume + ': </p>';
                    innerHTMLcontent += '<div class="clc-controlBox clc-field">';
                    innerHTMLcontent += buttonMinus;
                    innerHTMLcontent += '<input class="clc-controlBox__input" type="number" name="_tr_order_transaction_volume" id="_tr_order_transaction_volume" onkeyup="getCalculate.numberChange(this)" step="0.01" max="1000000" min="0" dolya="2" value="' + this.defaultValueVolume + '">';
                    innerHTMLcontent += buttonPlus;
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--radio">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].type_order + ': </p>';
                    innerHTMLcontent += '<div class="clc-radioBox">';
                    innerHTMLcontent += '<input class="clc-radioBox__input clc-field" type="radio" name="_tr_type_order" id="__tr_sell" value="Sell">';
                    innerHTMLcontent += '<label class="clc-radioBox__label" for="__tr_sell">Sell</label>';
                    innerHTMLcontent += '<input class="clc-radioBox__input clc-field" type="radio" name="_tr_type_order" id="__tr_buy" value="Buy" checked="">';
                    innerHTMLcontent += '<label class="clc-radioBox__label" for="__tr_buy">Buy</label>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--control">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].price_open + ': </p>';
                    innerHTMLcontent += '<div class="clc-controlBox clc-field">';
                    innerHTMLcontent += buttonMinus;
                    innerHTMLcontent += '<input class="clc-controlBox__input" type="number" name="_tr_price_open" id="_tr_price_open" onkeyup="getCalculate.numberChange(this)" step="0.00001" max="1000000" min="0.00000" dolya="5" value="' + this.defaultValuePrices + '">';
                    innerHTMLcontent += buttonPlus;
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--control">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].price_close + ': </p>';
                    innerHTMLcontent += '<div class="clc-controlBox clc-field">';
                    innerHTMLcontent += buttonMinus;
                    innerHTMLcontent += '<input class="clc-controlBox__input" type="number" name="_tr_price_close" id="_tr_price_close" onkeyup="getCalculate.numberChange(this)" step="0.00001" max="1000000" min="0.00000" dolya="5" value="' + this.defaultValuePrices + '">';
                    innerHTMLcontent += buttonPlus;
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</section>';

                    innerHTMLcontent += '<div class="clc-buttonsCta">';
                    innerHTMLcontent += '<button class="clc-buttonsCta__btn btn btn-main" onclick="getCalculate.getData();">' + this.defaultTitles[langBuild].submitBtn + '</button>';
                    innerHTMLcontent += '<button class="clc-buttonsCta__btn btn btn-second" onclick="getCalculate.cleanAll(\'' + langBuild + '\');">' + this.defaultTitles[langBuild].resetBtn + '</button>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';

                    innerHTMLcontent += '<div class="clc-results">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].resultText + '</p>';
                    innerHTMLcontent += '<div id="resultTrade" class="clc-table clc-field">';
                    innerHTMLcontent += '<div class="clc-tableTitles">';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].instrument + '</div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].price_open + '</div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].order_transaction_volume + '</div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].swop + ', ' + this.defaultTitles[langBuild].in + this.defaultTitles[langBuild].inpoints + '</div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].swop + ', ' + this.defaultTitles[langBuild].in + '<span class="__tr_val_switch"> USD</span></div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].margin + ' ' + this.defaultTitles[langBuild].in + '<span class="__tr_val_switch"> USD</span></div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].profit + this.defaultTitles[langBuild].in + '<span class="__tr_val_switch"> USD</span></div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    mainContent.className = 'clc-tradeCalculator__inner';
                    mainContent.innerHTML = innerHTMLcontent;
                    mainBlock.prepend(mainContent);
                    return this.destructPreloader();
                } else {
                    return this.getError('Такого языка в конструкторе нет!');
                }
            }
        },
        getDestroy: function() {
            if (this.takeObjClass('clc-tradeCalculator').length > 0) {
                var blockDest = this.takeObjClass('clc-tradeCalculator')[0];
                if (blockDest) {
                    blockDest.classList.remove('clc-tradeCalculator');
                    blockDest.innerHTML = '';
                }
            } else {
                return this.getError('Блок калькулятора не найден!');
            }
        },
        getDefault: function() {
            return this.cleanAll();
        },
        getNumberStamp: function(number) {
            var realNumber = number.toString(),
                arrayNumber = realNumber.split('.'),
                newText = arrayNumber[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newText + '.' + arrayNumber[1];
        },
        getData: function() {
            var enterData = {},
                typeorder = document.getElementsByName('_tr_type_order');
            enterData.group = document.getElementById('_group_instrument').value;
            enterData.typeacc = document.getElementById('_type_account').value;
            enterData.currency = document.getElementById('_account_currency').value;
            enterData.leverage = document.getElementById('_leverage').value;
            enterData.instrument = document.getElementById('_instrument').value;
            enterData.volume = Number(document.getElementById('_tr_order_transaction_volume').value);
            enterData.price_open = Number(document.getElementById('_tr_price_open').value);
            enterData.price_close = Number(document.getElementById('_tr_price_close').value);
            var leverage = enterData.leverage.split(':')[1],
                rateValue = this.getThisRate(enterData.group, enterData.currency, enterData.instrument),
                LOTSIZE = Number(this.lots[enterData.group]),
                firstInstrument,
                margin;
            for (var i = 0; i < typeorder.length; i++) {
                if (typeorder[i].checked) {
                    enterData.typeorder = typeorder[i].value;
                }
            }
            if (enterData.group == "Forex") {
                firstInstrument = enterData.instrument.split('/')[0];
                if (enterData.currency == firstInstrument) {
                    enterData.margin = enterData.volume * LOTSIZE / leverage;
                } else {
                    enterData.margin = enterData.volume * LOTSIZE / leverage * Number(enterData.price_open);
                }
            } else {
                enterData.margin = enterData.volume * LOTSIZE / leverage * rateValue;
            }
            enterData = this.setCalculator(enterData);
            return this.getResult(enterData);
        },
        getError: function(mess) {
            var message = (mess) ? mess : 'Неизвестная ошибка!';
            console.log(message);
        },
        getResult: function(data) {
            this.cleanResult();
            var boxResult = document.getElementById('resultTrade'),
                divResult = document.createElement('div'),
                htmlResult = '',
                currencyBlocks = this.takeObjClass('__tr_val_switch');
            for (var i = 0; i < currencyBlocks.length; i++) {
                currencyBlocks[i].innerHTML = data.currency;
            }
            divResult.className = '#clc-tableResults clc-tableResults';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + data.instrument + ' ' + data.typeorder + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.price_open.toFixed(4)) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.volume.toFixed(2)) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + ((data.typeorder === "Buy") ? this.getNumberStamp(data.swapBuy.toFixed(4)) : this.getNumberStamp(data.swapSell.toFixed(4))) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.currentSwapAccountCurrency.toFixed(2)) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.margin.toFixed(2)) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.profit.toFixed(2)) + '</div>';
            divResult.innerHTML = htmlResult;
            boxResult.append(divResult);
        }
    }

    window.getCalculate = getCalculate;

})(window);

(function addedCalculator() {
    if ($("div").is('#tradeCalculator')) {
        var langData;

        langData = definesLanguage() == 'zh' ? 'cn' : definesLanguage();
        getCalculate.getBuild(langData);
    }
})();