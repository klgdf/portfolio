/*

	Универсальный сборщик HTML-верстки и CMS-тем.
	@welcomehom3

*/

let project_folder = require('path').basename(__dirname);
let source_folder = 'build';

let fs = require('fs');
const { config } = require('process');

let settings = {
	html: false, // html or pug
	html_folder: 'html', // 'html' or 'wordpress'
	scss: true, // scss or sass
	js: false, // main.js or common.js and vendors.js,
	common_list: true, // list or auto
	vendors_list: true, // list or auto
	fonts: false, // ttf2woff2 or auto // Суть этой конфигурации в том, что когда закидываешь в папку шрифт ttf - он преобразует его в woff2 при true. Потом woff2 перезакидываешь в папку с исходниками и выставляешь false, чтобы файлы шрифтов не собирались каждый раз при запуске галпа, а просто переносились из папки шрифтов. Экономит ресурсы и время, чтобы шрифты не обрабатывались снова.
}

let path = {
	build: {
		html: project_folder + '/',
		pug: project_folder + '/',
		scss: project_folder + '/assets/css/',
		js: project_folder + '/assets/js/',
		img: project_folder + '/assets/img/',
		fonts: project_folder + '/assets/fonts/',
		video: project_folder + '/assets/video/',
	},
	src: {
		html: [source_folder + '/' + settings.html_folder + '/**/*', '!' + source_folder + '/' + settings.html_folder + '/**/_*.' + settings.html_folder],
		pug: [source_folder + '/pug/*.pug', '!' + source_folder + '/pug/_*.pug'],
		scss: [source_folder + '/sass/main.scss'],
		//js: source_folder + '/js/main.js',
		js: [source_folder + '/js/common.js', source_folder + '/js/vendors.js'],
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/**/*',
		video: source_folder + '/video/*.{mp4,webm,flv,avi}',
	},
	watch: {
		html: source_folder + '/' + settings.html_folder + '/**/*.' + settings.html_folder,
		pug: source_folder + '/pug/**/*.pug',
		scss: source_folder + '/sass/**/*.{sass,scss,css}',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
	},
	clean: './' + project_folder + '/',
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	clean_css = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	pug = require('gulp-pug'),
	group_media = require('gulp-group-css-media-queries'),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin'),
	//webp = require('gulp-webp'), 
	//webphtml = require('gulp-webp-html'),
	//webpcss = require('gulp-webpcss'),
	svg_sprite = require('gulp-svg-sprite'),
	//ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2');
//zip = require('gulp-zip');
//fonter = require('gulp-fonter')



function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		port: 3000,
		notify: false
	})
}

function html() {
	if (settings.html) {
		return src(path.src.html)
			.pipe(fileinclude())
			//.pipe(webphtml())
			.pipe(dest(path.build.html))
			.pipe(browsersync.stream())
	} else {
		return src(path.src.pug)
			.pipe(pug({
				pretty: true
			}))
			.pipe(dest(path.build.pug))
			.pipe(browsersync.stream())
	}
}

function css() {
	return src(path.src.scss)
		.pipe(
			sass({
				indentedSyntax: true,
				outputStyle: 'nested'
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)
		//.pipe(webpcss())
		.pipe(dest(path.build.scss))
		.pipe(browsersync.stream())
		.pipe(
			clean_css()
		)
		.pipe(
			rename({
				extname: '.min.css'
			})
		)
		.pipe(dest(path.build.scss))
		.pipe(browsersync.stream())
}


/* BEGIN JS */
function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}
/* END JS */

function images() {
	return src(path.src.img)
		//.pipe(webp({quality: 70}))
		.pipe(dest(path.build.img)) // сохранить webp
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				//svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3// 0 to 7
			})
		)
		.pipe(dest(path.build.img)) // сохранить оригинальные изображения, наверно
		.pipe(browsersync.stream())
}

function fonts(params) {
	if (settings.fonts) {
		return src(path.src.fonts + '*.ttf')
			.pipe(ttf2woff2())
			.pipe(dest(path.build.fonts))
	} else {
		return gulp.src(path.src.fonts + '*.{woff,woff2}')
			.pipe(gulp.dest(path.build.fonts))
	}
}

//! Сделать, чтобы при "settings.fonts = true" otf превращалось в woff2.
/* gulp.task('otf2ttf', function () {
	return gulp.src([source_folder + '/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'))
}) */

function video(params) {
	return src(path.src.video)
		.pipe(dest(path.build.video))
}

function svg(params) {
	return src([source_folder + '/img/*.svg'])
		.pipe(svg_sprite({
			mode: {
				stack: {
					sprite: 'icons/icons.svg',
					example: true
				},
				css: { // Activate the «css» mode
					render: {
						css: true // Activate CSS output (with default options)
					}
				}
			},
		}
		))
		.pipe(dest(path.build.img))
}


//! Сделать, чтобы css шрифтов генерировался таким же крутым как у меня. И главное, чтобы работало отображение шрифта, если он не загружен.
/*function fontsStyle(params) {  // разобраться с этим кодом
	let file_content = fs.readFileSync(source_folder + '/sass/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/sass/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/sass/fonts.scss', '@include font('' + fontname + '', '' + fontname + '', '400', 'normal');\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}*/

//* Оставить на случай обновления собранного проекта на удалённом сервере POST запросом, если FTP плохо работает.
// gulp.task('deployment', function () {
//   if (fs.existsSync('wp_template')) {
//     return gulp.src('wp_template')
//       .pipe(zip('zip.zip'))
//       .pipe(gulp.dest('./'));
//   }
// });

function watchFiles(params) {
	if (settings.html) {
		gulp.watch([path.watch.html], html);
	} else {
		gulp.watch([path.watch.pug], html);
	}
	if (settings.scss) {
		gulp.watch([path.watch.scss], css);
	} else {
		gulp.watch([path.watch.scss], css);
	}
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.img], svg);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, svg, fonts, video));
let watch = gulp.parallel(build, watchFiles, browserSync);

/* BEGIN EXPORT */
//exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.video = video;
exports.images = images;

// BEGIN EXPORT HTML
if (settings.html) {
	exports.html = html;
} else {
	exports.pug = html;
}

// BEGIN EXPORT CSS
exports.css = css;

// BEGIN EXPORT JS
exports.js = js;

exports.build = build;
exports.watch = watch;
exports.default = watch;
/* END EXPORT */

