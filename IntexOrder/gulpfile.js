/*

  Gulp for WP Template
  @welcomehom3

*/

let project_folder = require("path").basename(__dirname);
let source_folder = "build_intex";

let fs = require('fs');
const { config } = require("process");

let settings = {
  html: false, // html or pug
  scss: true, // scss or sass
  js: false, // main.js or common.js and vendors.js,
  common_list: true, // list or auto
  vendors_list: true, // list or auto
}

function common_list() { // Если массив пустой, то галп не запустит проект
  if (settings.common_list) {
    return [ // Статичный массив, если порядок библиотек имеет значение.
      'select.js',
      'document_clicks.js', // предпоследним перед common.js
      'common.js',
    ];
  } else {
    return fs.readdirSync(source_folder + '/js/');
  }
}

function vendors_list() { // Если массив пустой, то галп не запустит проект
  if (settings.vendors_list) {
    return [ // Статичный массив, если порядок библиотек имеет значение.
      //'lazy.js',
      'swiper_6.4.5.min.js',
      //'fullpage.js',
      //'scrolloverflow.min.js',
      //'wow.min.js',
      //'cookie.js',
    ];
  } else {
    return fs.readdirSync(source_folder + '/js/vendors/');
  }
}

let path = {
  build: {
    html: project_folder + "/",
    pug: project_folder + "/",
    scss: project_folder + "/assets/css/",
    main_js: project_folder + "/assets/js/",
    common_js: project_folder + "/assets/js/",
    vendors_js: project_folder + "/assets/js/",
    img: project_folder + "/assets/img/",
    fonts: project_folder + "/assets/fonts/",
    video: project_folder + "/assets/video/",
  },
  src: {
    html: [source_folder + "/php/**/*", "!" + source_folder + "/php/_*.php"],
    pug: [source_folder + "/pug/*.pug", "!" + source_folder + "/pug/_*.pug"],
    scss: source_folder + "/sass/main.scss",
    main_js: source_folder + "/js/**/*.js",
    common_js: [source_folder + "/js/*.js", "!" + source_folder + "/js/_*.j_s"],
    vendors_js: source_folder + "/js/vendors/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
    video: source_folder + "/video/*.{mp4,webm,flv,avi}",
  },
  watch: {
    html: source_folder + "/php/**/*.html",
    pug: source_folder + "/pug/**/*.pug",
    scss: source_folder + "/sass/**/*.{sass,scss,css}",
    main_js: source_folder + "/js/**/*.js",
    common_js: source_folder + "/js/*.js",
    vendors_js: source_folder + "/js/vendors/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/",
}

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  clean_css = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  pug = require('gulp-pug'),
  group_media = require('gulp-group-css-media-queries'),
  uglify = require('gulp-uglify-es').default,
  //imagemin = require('gulp-imagemin'),
  //webp = require('gulp-webp'), 
  //webphtml = require('gulp-webp-html'),
  //webpcss = require('gulp-webpcss'),
  svgSprite = require('gulp-svg-sprite'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  zip = require('gulp-zip');
//fonter = require('gulp-fonter');



function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
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
        //indentedSyntax: true,
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
    .pipe(
      clean_css()
    )
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.scss))
    .pipe(browsersync.stream())
}


/* BEGIN JS */

function mainJS() {
  if (settings.js) {
    let common_js = common_list();
    let vendors_js = vendors_list();
    let main_js = [];
    for (i = 0; i < vendors_js.length; i++) {
      main_js.push(source_folder + '/js/vendors/' + vendors_js[i]);
    }
    for (i = 0; i < common_js.length; i++) {
      main_js.push(source_folder + '/js/' + common_js[i]);
    }
    return src(
      main_js
    )
      .pipe(concat('main.js'))
      .pipe(gulp.dest(path.build.main_js))
      .pipe(uglify())
      .pipe(
        rename({
          extname: ".min.js"
        })
      )
      .pipe(gulp.dest(path.build.main_js))
      .pipe(browsersync.stream())
  } else {
    console.log('mainJS disabled');
  }
}

function commonJS() {
  if (!settings.js) {
    let common_js = common_list();
    for (i = 0; i < common_js.length; i++) {
      common_js[i] = source_folder + '/js/' + common_js[i];
    }
    return src(
      common_js
    )
      .pipe(concat('common.js'))
      .pipe(gulp.dest(path.build.common_js))
      .pipe(uglify())
      .pipe(
        rename({
          extname: ".min.js"
        })
      )
      .pipe(gulp.dest(path.build.common_js))
      .pipe(browsersync.stream())
  } else {
    console.log('commonJS disabled');
  }
}

function vendorsJS() {
  if (!settings.js) {
    let vendors_js = vendors_list();
    for (i = 0; i < vendors_js.length; i++) {
      vendors_js[i] = source_folder + '/js/vendors/' + vendors_js[i];
    }
    return src(
      vendors_js
    )
      .pipe(concat('vendors.js'))
      .pipe(gulp.dest(path.build.vendors_js))
      .pipe(uglify())
      .pipe(
        rename({
          extname: ".min.js"
        })
      )
      .pipe(gulp.dest(path.build.vendors_js))
      .pipe(browsersync.stream())
  } else {
    console.log('vendorsJS disabled');
  }
}
/* END JS */

function images() {
  return src(path.src.img)
    //.pipe(webp({quality: 70}))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    /*.pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 1// 0 to 7
      })
    )*/
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function fonts(params) {
  //src(path.src.fonts)
  //.pipe(ttf2woff())
  //.pipe(dest(path.build.fonts))
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}

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

gulp.task('svgSprite', function () {
  return gulp.src([source_folder + '/iconsprite/*.svg'])
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../icons/icons.svg", // sprite file name
          example: true
        }
      },
    }
    ))
    .pipe(dest(path.build.img))
});

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
            fs.appendFile(source_folder + '/sass/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
}*/


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
  }
  if (settings.js) {
    gulp.watch([path.watch.main_js], mainJS);
  } else {
    gulp.watch([path.watch.common_js], commonJS);
    gulp.watch([path.watch.vendors_js], vendorsJS);
  }
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(mainJS, commonJS, vendorsJS, css, html, images, fonts, video));
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
if (settings.js) {
  //exports.mainJS = js;
  exports.js = mainJS;
} else {
  exports.js = commonJS;
  exports.js = vendorsJS;
}

exports.build = build;
exports.watch = watch;
exports.default = watch;
/* END EXPORT */

