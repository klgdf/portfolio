import { definesLanguage } from './global'; // хук для определения языка
import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import __NEWS_JSON from './json/news.json'; // подключение объекта со всеми статичными переводами для новостей
import 'jquery-rss'; // подключение плагина для подгрузки rss новостей

function isbeta(name) {

    let url = name; // путь к файлу - если у вас другой - то его и указываете
    let pathname = location.pathname.split('/');
    for (let i = 0; i < pathname.length; i++) {
        if (pathname[i] == 'beta') url = '/beta' + name; // если мы на бете, то добавляем подддомен 'beta' к пути
    }
    return url;
}

(function getnewsrss() {
    let langData = definesLanguage(),
        baseDir = langData == __CONFIG_GLOBAL.defaultLanguage ? '' : '../';
    langData = (langData === 'zh') ? 'cn' : langData;
    var html = '';
    $.ajax({
        url: isbeta('/rssrequest.php'),
        method: 'GET',
        data: {
            lang: langData
        },
        type: 'json',
        success: function success(data) {

            var res = JSON.parse(data);
            var img
            for (var i = 0; i < res.length; i++) {
                // var author = res[i].author != '' ? textLang[langData].authors + ': ' + res[i].author : '',
                //     date = res[i].date != '' ? textLang[langData].date + ': ' + res[i].date : '';
                var author = res[i].author != '' ? res[i].author : '',
                    date = res[i].date != '' ? res[i].date : '';
                img = res[i].img_url != '' ? res[i].img_url : isbeta('/assets/images/news.svg');


                html += '\
		<div class="news-item">\
			<a target="_blank" href="' + res[i].link + '" >\
				<img class="news-item__img" src="' + img + '">\
				<div class="news-item__content">\
					<div class="news-item__title">' + res[i].title + '</div>\
					<div class="news-item__date">\
								<div class="calendar">\
									<img class="calendar__icon" src="/assets/images/calendar.svg">\
								</div >\
								<span> ' + date + '</span>\
					</div >\
					<div class="news-item__author description">' + __NEWS_JSON[langData].authors + ' <span>' + author + '</span></div>\
					<div class="news-item__btn">' + __NEWS_JSON[langData].more + '</div>\
				</div>\
			</a>\
		</div>\
		';
            }


            $('.news-slider').html(html);

            $('.news-slider').slick({
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true,
                arrows: true,
                // appendDots: $('.news-slider-dots'),
                prevArrow: $('.news-slider-prev'),
                nextArrow: $('.news-slider-next'),
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });


        },
        error: function error() {
            console.log('error');
        }
    });

})();