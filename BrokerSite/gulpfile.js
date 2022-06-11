const win = process.platform === "win32";
const globalConfig = 'site.config.json';
const { src, dest, parallel, series, watch } = require('gulp');
const siteconfig = require('./' + globalConfig);
const wait = require('gulp-wait');
const gulpif = require('gulp-if');
const robots = require('gulp-robots');
const php = require('gulp-connect-php');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const rename = require("gulp-rename");
const through = require('through2');
const debug = require('gulp-debug');
const sitemap = require('gulp-sitemap');
const rep = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');
const async = require('async');
//const changed = require('gulp-changed');
const fs = require('fs');
const injectdata = require('gulp-data');
const csv2json = require('gulp-csvtojson');
const jeditor = require("gulp-json-editor");
const webpackStream = require('webpack-stream');
const purify = require('gulp-purify-css');
const __release = process.title === 'gulp build:release';
const configWebpack = __release ? require('./webpack.release.config') : require('./webpack.dev.config');

require('events').EventEmitter.prototype._maxListeners = 2000; // увеличение объема используемой памяти для переименования изображений

var arrayLanguage = [], // массив в который собирается названия файлов с переводами, из него создается массив используемых языков
    thisimageList = [], // массив для переименования изображений
    thisnewImageList = [], // массив для переименования изображений
    thisImageReal = [], // массив для переименования изображений
    saveMassive = [], // массив для переименования изображений
    filenameCashe = '', // новое название сендера
    filenameRss = '', // новое название rssrequest
    runTimestamp = Math.round(Date.now() / 1000); // штамп для iconfont

function browsersync() {
    if (siteconfig.php) {
        php.server({
            base: siteconfig.build.links.build.core + '/',
            port: siteconfig.build.port,
            debug: false,
            stdio: 'ignore', // закрыть лог в консоле, чтобы не засирать консоль
            keepalive: true,
            ini: win ? siteconfig.build.links.source.php.windows.phpini : siteconfig.build.links.source.php.other.phpini,
            bin: win ? siteconfig.build.links.source.php.windows.phpbase : siteconfig.build.links.source.php.other.phpbase
        }, function() {
            browserSync.init({
                baseDir: siteconfig.build.links.build.core + '/',
                notify: false,
                online: true,
                proxy: siteconfig.build.proxy + ':' + siteconfig.build.port
            })
        });
    } else {
        browserSync.init({
            server: {
                baseDir: siteconfig.build.links.build.core + '/'
            },
            notify: false,
            online: true,
            // proxy: siteconfig.build.proxy + ':' + siteconfig.build.port
        })
    }
}

/**
 * Генерация иконок 
 * Есть зависимая функция mapGlyphs
 */
function icons(done) {
    if (siteconfig.iconplugin) {
        var iconStream = src(siteconfig.build.links.source.assets.icons + '/**/*.svg')
            .pipe(
                iconfont({
                    fontName: siteconfig.build.links.source.icons.fontname,
                    prependUnicode: true,
                    formats: siteconfig.build.links.source.icons.formats,
                    normalize: true,
                    fontWeight: '300',
                    fontHeight: 100,
                    fixedWidth: false,
                    centerHorizontally: false,
                    timestamp: runTimestamp
                }),
            );
        async.parallel(
            [
                function handleGlyphs(cb) {
                    iconStream.on('glyphs', function(glyphs, options) {
                        src(siteconfig.build.links.source.icons.template)
                            .pipe(consolidate('lodash', {
                                glyphs: glyphs.map(mapGlyphs),
                                fontName: siteconfig.build.links.source.icons.fontname,
                                fontPath: '/assets/css/',
                                className: 'i'
                            }))
                            .pipe(dest(siteconfig.build.links.build.assets.css + '/'))
                            .on('finish', cb);
                    });
                },
                function handleFonts(cb) {
                    iconStream.pipe(dest(siteconfig.build.links.build.assets.css)).on('finish', cb);
                }
            ], done);
    } else {
        // заглушка для задачи с иконками, если они не требуются
        return src(siteconfig.build.links.source.assets.icons + '/**/*.svg');
    }
}

function mapGlyphs(glyph) {
    return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}

function createrobots() {
    return src(siteconfig.build.links.build.core + '/**/*.html')
        .pipe(robots({
            useragent: '*',
            allow: [...siteconfig.robotsfile.allow[siteconfig.seo]],
            disallow: [...siteconfig.robotsfile.disallow[siteconfig.seo]]
        }))
        .pipe(dest(siteconfig.build.links.build.core));
}

function scripts() {
    return src(configWebpack.entry)
        .pipe(webpackStream(configWebpack))
        .pipe(gulpif(!__release, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(!__release, through.obj(function(file, enc, cb) {
            const isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) this.push(file);
            cb();
        })))
        .pipe(gulpif(!__release, sourcemaps.write('.')))
        .pipe(rep(siteconfig.build.links.source.rssrequest.title, filenameRss))
        .pipe(dest(configWebpack.output.path))
        .pipe(gulpif(!__release, browserSync.stream()));
}

function stylesbuild() {
    return src(siteconfig.build.links.source.assets.scss + '/**/*.scss')
        .pipe(gulpif(siteconfig.waitplugin, wait(250)))
        //.pipe(changed('build/assets/css/', { hasChanged: changed.compareContents }))
        .pipe(gulpif(!__release, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        //.pipe(concat('main.min.css'))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(gulpif(siteconfig.seo, purify(
            [
                siteconfig.build.links.build.assets.js + '/**/*.js',
                siteconfig.build.links.build.core + '/**/*.html'
            ]
        )))
        .pipe(gulpif(__release, autoprefixer({ overrideBrowserslist: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'], grid: true, cascade: false })))
        .pipe(gulpif(__release, cleancss({ level: { 2: { specialComments: 0 } } })))
        .pipe(gulpif(!__release, sourcemaps.write()))
        .pipe(dest(siteconfig.build.links.build.assets.css + '/'))
        .pipe(gulpif(!__release, browserSync.stream()))
}

function buildcopy() {
    return src(
            [
                siteconfig.build.links.source.assets.fonts + '/**/*',
                siteconfig.build.links.source.assets.img + '/**/*'
            ], {
                base: siteconfig.build.links.source.core
            })
        .pipe(dest(siteconfig.build.links.build.core))
        .pipe(gulpif(!__release, browserSync.stream()));
}

function buildres() {
    return src([
            siteconfig.build.links.source.resources + '/**/*',
            '!' + siteconfig.build.links.source.resources + '/**/*.php'
        ], { dot: true })
        .pipe(dest(siteconfig.build.links.build.core))
        .pipe(gulpif(!__release, browserSync.stream()));
}

function buildsender() {
    let newname = '';
    for (var i = 0; i < Number(siteconfig.imagerename.numberletters); i++) {
        newname += siteconfig.imagerename.possibles.charAt(Math.floor(Math.random() * siteconfig.imagerename.possibles.length));
    }
    return src(siteconfig.build.links.source.resources + '/' + siteconfig.build.links.source.sender.title)
        .pipe(rename(function(path) {
            path.basename = newname;
            filenameCashe += (path.dirname != '.') ? path.dirname + "/" : '';
            filenameCashe += path.basename + path.extname;
            filenameCashe = filenameCashe.replace(/\\/g, '/'); // для windows путей
        }))
        .pipe(dest(siteconfig.build.links.build.core));
}

function buildrssphp() {
    let newname = '';
    for (var i = 0; i < Number(siteconfig.imagerename.numberletters); i++) {
        newname += siteconfig.imagerename.possibles.charAt(Math.floor(Math.random() * siteconfig.imagerename.possibles.length));
    }
    return src(siteconfig.build.links.source.resources + '/' + siteconfig.build.links.source.rssrequest.title)
        .pipe(rename(function(path) {
            path.basename = newname;
            filenameRss += (path.dirname != '.') ? path.dirname + "/" : '';
            filenameRss += path.basename + path.extname;
            filenameRss = filenameRss.replace(/\\/g, '/'); // для windows путей
        }))
        .pipe(dest(siteconfig.build.links.build.core));
}

function cleanbuild() {
    return del([
        siteconfig.build.links.build.core + '/**/*',
        siteconfig.build.links.build.core + '/.htaccess'
    ], {
        force: true
    })
}

function pg() {
    return src([siteconfig.build.links.source.pages + '/**/*.pug'])
        //.pipe(changed('build/', { hasChanged: changed.compareContents }))
        .pipe(plumber())
        .pipe(injectdata(function(file) {
            try {
                if (fs.existsSync('./' + siteconfig.build.links.build.core + '/' + siteconfig.build.contentfile + '.json')) {
                    return JSON.parse(
                        fs.readFileSync('./' + siteconfig.build.links.build.core + '/' + siteconfig.build.contentfile + '.json')
                    );
                }
            } catch (err) {
                return '';
            }
        }))
        .pipe(injectdata(function(file) {
            try {
                if (fs.existsSync(globalConfig)) {
                    return JSON.parse(
                        fs.readFileSync(globalConfig)
                    );
                }
            } catch (err) {
                return '';
            }
        }))
        .pipe(pug({ pretty: true }))
        .pipe(plumber.stop())
        .pipe(rep(siteconfig.build.links.source.sender.title, filenameCashe))
        .pipe(gulpif(siteconfig.seo, htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(dest(siteconfig.build.links.build.core))
        .pipe(gulpif(!__release, browserSync.stream()))
}

function paramsDetect(element, params = null) {
    // убираем лишние пробелы, переносы строк
    if (element.translate !== undefined) {
        let translateString = element.translate.toString().split('\n').join('').split('\r').join('').split(' ').filter((item) => { return item !== ''; }).join(' '),
            lang = element.lang;
        // начинаем обрабатывать парамметры
        if (params == null) {
            return translateString;
        } else {
            let message = translateString.split(''),
                endless = ["!", ";", "?", ":"];
            switch (params) {
                // если стоит парамметр nodot - не должно быть точки в конце строки
                case 'nodot':
                    if (message[message.length - 1] == '.' || message[message.length - 1] == '。') {
                        message.pop();
                        return message.join('');
                    } else {
                        return message.join('');
                    }
                    // если стоит парамметр dot - должна быть точка в конце
                case 'dot':
                    if (endless.indexOf(message[message.length - 1]) == -1) {
                        if (message[message.length - 1] == '.' || message[message.length - 1] == '。') {
                            return message.join('');
                        } else {
                            if (lang !== 'zh') {
                                message.push('.');
                            } else {
                                message.push('。');
                            }
                            return message.join('');
                        }
                    } else {
                        return message.join('');
                    }
                default:
                    return translateString;
            }
        }
    } else {
        console.log('Ошибка для переменной ' + element.constant + ' в языке: ' + element.lang + '.csv');
        process.exit();
    }
}

function jsoncontent() {
    return src(siteconfig.build.links.source.csv + '/**/*.csv')
        // собираем названия всех языков по названию файлов
        .pipe(through.obj(function(file, encoding, callback) {
            let fileArrays, filename,
                startKavichka = null,
                nowElement = null;
            fileArrays = file.path.split("/");
            if (fileArrays.length === 1) { // для windows путей
                fileArrays = file.path.split("\\");
            }
            filename = fileArrays[fileArrays.length - 1].split('.')[0];
            if (arrayLanguage.indexOf(filename) === -1) {
                arrayLanguage.push(filename);
            }
            // добавляем язык по названию файла
            if (file.isStream()) {
                console.log('Скрипт должен работать в режиме Буфферизации');
                process.exit();
            }
            if (file.isBuffer()) {
                let result = file.contents.toString().split('\n').map(function(st, i) {
                    return st.split('\r').join(' ');
                }).join('{|}').split('"').map(function(item, i) {
                    // проверяем энтеры между кавычками
                    if (!(startKavichka == null && nowElement == null)) {
                        nowElement = null;
                        startKavichka = null;
                        // меняем энтеры на пробелы, меняем запятые между кавычками на новый сепаратор запятыми
                        return item.split('{|}').join(' ').split(',').join('{|||}');
                    } else {
                        nowElement = i;
                        startKavichka = item;
                        return item;
                    }
                }).join('"').split('{|}').filter(function(str) {
                    let newstring = str.split(',');
                    // избавляемся от пустых строк
                    if (!(newstring[0] == '' || newstring[1] == '' || newstring[2] == '' || newstring[3] == '')) {
                        return str;
                    }
                }).map(function(st, j) {
                    // подключаем сепоратор на обычные запятые с пробелами
                    return st.split(', ').join('{||}');
                }).map(function(st, j) {
                    // проверка на заголовки
                    if (j == 0) {
                        let warnignArray = st.split(',');
                        if (!(warnignArray[0] == "id" || warnignArray[1] == "constant" || warnignArray[2] == "position" || warnignArray[3] == "translate")) {
                            console.log('Не правильные заголовки в первой строке: должны быть id,constant,position,translate в файле: ' + filename + '.csv');
                            process.exit();
                        }
                    }
                    // вырезаем все ненужные колонки
                    return st.split(',').map(function(item, i) {
                        // ограничиваем по 3 колонку начиная с нулевой
                        if (i < 4) {
                            if (i == 0 && item == 'id') {
                                item = 'lang';
                            } else if (i == 0) {
                                item = filename.toString();
                            }
                            return item;
                        } else {
                            return null;
                        }
                    }).join(',');
                }).map(function(st, j) {
                    // возвращаем текстовые запятые
                    return st.split('{||}').join(', ').split('{|||}').join(',');
                }).map(function(st, j) {
                    // убираем лишние пробелы
                    return st.split(' ').filter(function(str) {
                        return str !== '';
                    }).join(' ');
                }).join('\r\n'); // закрываем контент
                file.contents = new Buffer(result);
                return callback(null, file);
            }
            return callback(null, file);
        }))
        .pipe(concat(siteconfig.build.contentfile + '.csv'))
        // редактирование объеденного файла .csv (убираем дубликаты заголовков)
        .pipe(through.obj(function(file, encoding, callback) {
            if (file.isStream()) {
                console.log('Скрипт должен работать в режиме Буфферизации');
                process.exit();
            }
            if (file.isBuffer()) {
                let titlesCSV = file.contents.toString().split('\r\n')[0].toString().split(' ').join('').split('\r').join('').split('\n').join('').split(',').filter((item)=>{return item!=='';}).join(','),
                    result = file.contents.toString().split('\r\n').map(function(item) {
                        return item.toString().split(',').filter(function(el) { return el !== '' }).join(',').split('\r').join('').split('\n').join('');
                    }).join('\r\n').split(titlesCSV + '\r\n').join('\r\n').split('\r\n');
                result = [titlesCSV, ...result];
                result = result.join('\r\n');
                file.contents = new Buffer(result);
                // возвращаем новый файл без дубликтов первого заголовка
                return callback(null, file);
            }
            callback(null, file);
        }))
        // конвертация в json
        .pipe(csv2json({}))
        // создание формата под pug
        .pipe(jeditor(function(json) {
            let allConstants = {};
            // собираем все константы для сайта
            try {
                json.forEach((element) => {
                    let params = element.constant.split('|').length > 1 ? element.constant.split('|')[1] : null,
                        varItem = element.constant.split('|')[0],
                        arrJson = varItem.split('.');
                    // создаем весь массив переменных
                    if (allConstants[arrJson[0]] == undefined) { allConstants[arrJson[0]] = {}; }
                    if (arrJson[1] !== undefined) {
                        if (allConstants[arrJson[0]][arrJson[1]] == undefined) { allConstants[arrJson[0]][arrJson[1]] = {}; }
                        if (arrJson[2] !== undefined) {
                            if (allConstants[arrJson[0]][arrJson[1]][arrJson[2]] == undefined) { allConstants[arrJson[0]][arrJson[1]][arrJson[2]] = {}; }
                            if (arrJson[3] !== undefined) {
                                if (allConstants[arrJson[0]][arrJson[1]][arrJson[2]][arrJson[3]] == undefined) { allConstants[arrJson[0]][arrJson[1]][arrJson[2]][arrJson[3]] = {}; }
                                if (arrJson[4] !== undefined) {
                                    if (allConstants[arrJson[0]][arrJson[1]][arrJson[2]][arrJson[3]][arrJson[4]] == undefined) { allConstants[arrJson[0]][arrJson[1]][arrJson[2]][arrJson[3]][arrJson[4]] = {}; }
                                    allConstants[arrJson[0]][arrJson[1]][arrJson[2]][arrJson[3]][arrJson[4]][element.lang] = paramsDetect(element, params);
                                } else {
                                    allConstants[arrJson[0]][arrJson[1]][arrJson[2]][arrJson[3]][element.lang] = paramsDetect(element, params);
                                }
                            } else {
                                allConstants[arrJson[0]][arrJson[1]][arrJson[2]][element.lang] = paramsDetect(element, params);
                            }
                        } else {
                            allConstants[arrJson[0]][arrJson[1]][element.lang] = paramsDetect(element, params);
                        }
                    } else {
                        allConstants[arrJson[0]][element.lang] = paramsDetect(element, params);
                    }
                });
                return allConstants;
            } catch (err) {
                console.log('Возникла ошибка сборки переводов: ' + err);
                process.exit();
            }
        }))
        .pipe(dest(siteconfig.build.links.build.core))
        .pipe(gulpif(!__release, browserSync.stream()));
}

function createsitemap() {
    let indexShow = [siteconfig.build.links.build.core + '/*.html'],
        indexClose = [];
    siteconfig.sitemapfile.hidepage.forEach((item) => {
        indexClose.push('!' + siteconfig.build.links.build.core + '/**/' + item + '.html');
    });
    return src(
            [
                ...indexShow,
                ...indexClose
            ], {
                read: false
            })
        .pipe(gulpif(siteconfig.seo, sitemap({
            siteUrl: siteconfig.companyData.url != "" ? siteconfig.companyData.url : '/',
            changefreq: siteconfig.sitemapfile.freq != "" ? siteconfig.sitemapfile.freq : "monthly",
            priority: function(siteUrl, loc, entry) {
                return entry.file !== '' ? 0.5 : 1;
            },
            lastmod: Date.now(),
            hreflang: [{
                    lang: siteconfig.seolocales.siteLocale.de,
                    getHref: function(siteUrl, file, lang, loc) {
                        return siteUrl + 'de/' + file;
                    }
                },
                {
                    lang: siteconfig.seolocales.siteLocale.es,
                    getHref: function(siteUrl, file, lang, loc) {
                        return siteUrl + 'es/' + file;
                    }
                },
                {
                    lang: siteconfig.seolocales.siteLocale.fr,
                    getHref: function(siteUrl, file, lang, loc) {
                        return siteUrl + 'fr/' + file;
                    }
                },
                {
                    lang: siteconfig.seolocales.siteLocale.it,
                    getHref: function(siteUrl, file, lang, loc) {
                        return siteUrl + 'it/' + file;
                    }
                },
                {
                    lang: siteconfig.seolocales.siteLocale.ru,
                    getHref: function(siteUrl, file, lang, loc) {
                        return siteUrl + 'ru/' + file;
                    }
                },
                {
                    lang: siteconfig.seolocales.siteLocale.zh,
                    getHref: function(siteUrl, file, lang, loc) {
                        return siteUrl + 'zh/' + file;
                    }
                },
            ],
        })))
        .pipe(gulpif(siteconfig.seo, dest(siteconfig.build.links.build.core)));
}

function jsonldeditor() {
    return src(siteconfig.build.links.source.pug + '/**/*.json')
        .pipe(rep('{title}', siteconfig.companyData.title))
        .pipe(rep('{url}', siteconfig.companyData.url))
        .pipe(rep('{phone}', siteconfig.companyData.phone))
        .pipe(rep('{logo}', '/' + siteconfig.brandlinks.logo))
        .pipe(gulpif(siteconfig.seo, dest(siteconfig.build.links.build.assets.json)));
}

function askAllImages() {
    src(siteconfig.build.links.build.assets.img + '/**/*.{' + siteconfig.imagerename.formats.join(',') + '}')
        .pipe(through.obj(function(file, enc, cb) {
            var arrayPath = siteconfig.build.links.build.assets.img.split('/'),
                imgadr;
            arrayPath.shift();
            imgadr = file.path.split(arrayPath.join("/") + "/")[1];
            if (imgadr === undefined) { // для windows путей
                imgadr = file.path.split(arrayPath.join("\\") + "\\")[1];
                imgadr = imgadr.replace(/\\/g, '/')
            }
            // проверка пути если файл вложенный
            imgadr = win ? imgadr.replace("/", "\\") : imgadr;
            // если картинки нет в массиве исключений то добавляем в массив удаления после переименовывания
            if (siteconfig.imagerename.nonerename.indexOf(String(imgadr).trim()) === -1) {
                thisimageList.push(imgadr);
                thisImageReal.push(file.path);
            }
            cb(null);
        }));
    return src(siteconfig.build.links.build.assets.img + '/**/*.{' + siteconfig.imagerename.formats.join(',') + '}')
        .pipe(rename(function(path) {
            var cache = '',
                fileCache = '',
                realNameString = path.basename + path.extname;
            for (var i = 0; i < Number(siteconfig.imagerename.numberletters); i++) {
                cache += siteconfig.imagerename.possibles.charAt(Math.floor(Math.random() * siteconfig.imagerename.possibles.length));
            }
            console.log(realNameString);
            // если картинки нет в массиве исключений то переименовываем ее
            if (siteconfig.imagerename.nonerename.indexOf(String(realNameString).trim()) === -1) {
                path.basename = "img" + cache;
            }
            fileCache += (path.dirname != '.') ? path.dirname + "/" : '';
            fileCache += path.basename + path.extname;
            fileCache = fileCache.replace(/\\/g, '/'); // для windows путей
            thisnewImageList.push(fileCache);
        }))
        .pipe(dest(siteconfig.build.links.build.assets.img))
        .on('end', function() {
            del(thisImageReal);
            for (var i = 0; i < thisimageList.length; i++) {
                saveMassive.push([thisimageList[i], thisnewImageList[i]])
            }
        });
};

function replaceAllImagesHTML() {
    return src(siteconfig.build.links.build.core + '/**/*.html')
        .pipe(debug())
        .pipe(replaceArray(saveMassive))
        .pipe(dest(siteconfig.build.links.build.core));
};

function replaceAllImagesCSS() {
    return src(siteconfig.build.links.build.core + '/**/*.css')
        .pipe(debug())
        .pipe(replaceArray(saveMassive))
        .pipe(dest(siteconfig.build.links.build.core));
};

function replaceAllImagesJS() {
    return src(siteconfig.build.links.build.core + '/**/*.js')
        .pipe(debug())
        .pipe(replaceArray(saveMassive))
        .pipe(dest(siteconfig.build.links.build.core));
};

function replaceArray(searchArray) {
    return through.obj(function(file, encoding, callback) {
        if (file.isStream()) {
            file.contents = searchArray.reduce(function(contents, search) {
                return contents.pipe(rs(search[0], search[1]));
            }, file.contents);
            return callback(null, file);
        }
        if (file.isBuffer()) {
            var result = searchArray.reduce(function(contents, search) {
                return contents
                    .split(search[0])
                    .join(search[1]);
            }, String(file.contents));
            file.contents = new Buffer(result);
            return callback(null, file);
        }
        callback(null, file);
    });
}

async function serve() {
    watch(siteconfig.build.links.source.assets.icons + '/**/*.svg', icons);
    watch(siteconfig.build.links.source.resources + '/' + siteconfig.build.links.source.sender.title, buildsender);
    watch(siteconfig.build.links.source.resources + '/' + siteconfig.build.links.source.rssrequest.title, buildrssphp);
    watch(siteconfig.build.links.source.assets.scss + '/**/*.scss', stylesbuild);
    watch(siteconfig.build.links.source.assets.js + '/**/*.js', scripts);
    watch(siteconfig.build.links.source.assets.fonts + '/**.*', buildcopy);
    watch(siteconfig.build.links.source.assets.img + '/**.*', buildcopy);
    watch(siteconfig.build.links.source.resources + '/**/*', buildres);
    watch(siteconfig.build.links.build.core + '/**/*.html').on('change', browserSync.reload);
    watch(siteconfig.build.links.source.pages + '/**/*.pug', pg);
    watch(siteconfig.build.links.source.pug + '/**/*.pug', pg);
    watch(siteconfig.build.links.source.csv + '/**/*.csv', jsoncontent);
    watch(siteconfig.build.links.build.core + '/' + siteconfig.build.contentfile + '.json', pg);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.buildcopy = buildcopy;
exports.buildres = buildres;
exports.stylesbuild = stylesbuild;
exports.cleanbuild = cleanbuild;
exports.jsonldeditor = jsonldeditor;
exports.pg = pg;
exports.createsitemap = createsitemap;
exports.createrobots = createrobots;
exports.jsoncontent = jsoncontent;
exports.askAllImages = askAllImages;
exports.replaceAllImagesHTML = replaceAllImagesHTML;
exports.replaceAllImagesCSS = replaceAllImagesCSS;
exports.replaceAllImagesJS = replaceAllImagesJS;
exports.icons = icons;
exports.buildsender = buildsender;
exports.buildrssphp = buildrssphp;

exports['build:release'] = series(cleanbuild, jsonldeditor, jsoncontent, buildcopy, buildres, buildsender, buildrssphp, pg, scripts, icons, stylesbuild, askAllImages, replaceAllImagesHTML, replaceAllImagesCSS, replaceAllImagesJS, createsitemap, createrobots);
exports['build:dev'] = series(cleanbuild, jsoncontent, buildrssphp, parallel(buildcopy, buildres, scripts), icons, buildsender, pg, stylesbuild);
exports.default = series(series(cleanbuild, jsoncontent, buildrssphp, parallel(buildcopy, buildres, scripts), icons, buildsender, pg, stylesbuild), serve, browsersync);