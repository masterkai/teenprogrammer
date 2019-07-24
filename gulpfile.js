var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    minifyCSS = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    concatCSS = require('gulp-concat-css'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel'),
    // Handlebars plugins
    handlebars = require('gulp-handlebars'),
    handlebarsLib = require('handlebars'),
    declare = require('gulp-declare'),
    wrap = require('gulp-wrap'),
    // Image compression
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    del = require('del'),
    zip = require('gulp-zip');

// File paths
var DIST_PATH = 'public/build/js/';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMG_PATH = 'public/img/**/*.{png,jpeg,jpg,svg,gif}';
var IMAGES_PATH = 'public/build/images/';

// handles gulp errors
function handleErrors (error){
    console.error(error);
    this.emit('end');
}

// modifies styles
gulp.task('styles', function () {
    console.log('starting styles!');
    return gulp.src('public/css/**/*.scss')
            .pipe(compass({
            css: 'public/build/css',            // compass 輸出位置
            sass: 'public/css',                 // sass 來源路徑
            image: 'public/img',                // 圖片來源路徑
            style: 'nested',                    // CSS 處理方式，預設 nested（expanded, nested, compact, compressed）
            comments: false,                    // 是否要註解，預設(true)
            require: ['susy']                   // 額外套件 susy
        })).on('error', handleErrors)
            .pipe(prefix('last 2 versions'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('public/build/css/'));
});
// reloads styles
gulp.task('styles:reload', ['styles'],function () {
    gulp.src('public/css/styles.scss').pipe(livereload({auto:false}));
});
// modifies vendor styles
gulp.task('styles:vendor', function () {
    gulp.src('public/vendor/css/**/*.css')
        .pipe(concatCSS('vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/css/'));
});
// reload vendor styles
gulp.task('styles:vendor:reload', function () {
    gulp.src('public/vendor/css/**/*.css').pipe(livereload({auto:false}));
});
// modifies scripts
gulp.task('scripts', function () {
    console.log('starting scripts!');
    gulp.src('public/js/**/*.js')
        .pipe(plumber(function (err) {
            console.log('Scripts Task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(jshint())
        // .pipe(jshint.reporter(stylish))
        // .pipe(jshint.reporter('fail'))
        // .on('error', function () {
        //     this.emit('end');
        // })
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/js/'));
});
// reload script
gulp.task('scripts:reload', function () {
    gulp.src('public/js/**/*.js').pipe(livereload({auto:false}));
});

// Images
gulp.task('images', function () {
    return gulp.src(IMG_PATH)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest(IMAGES_PATH));
});

gulp.task('templates', function () {
    return gulp.src(TEMPLATES_PATH)
        .pipe(handlebars({
            handlebars: handlebarsLib
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// watches files
gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('public/js/**/*.js', ['scripts', 'scripts:reload']);

    gulp.watch('public/index.html').on('change', livereload.changed);

    gulp.watch('public/css/**/*.scss', ['styles', 'styles:reload']);

    gulp.watch('public/vendor/css/**/*.css', ['styles:vendor', 'styles:vendor:reload']);

    gulp.watch(TEMPLATES_PATH, ['templates']);
});

gulp.task('export', function () {
   return gulp.src(['public/build/**/*', 'public/*.html'])
       .pipe(zip('website.zip'))
       .pipe(gulp.dest('./'));
});

// runs all gulp tasks
gulp.task('default', function () {
    gulp.start('styles', 'scripts', 'templates');
});