let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

// Обрабатываем все scss файлы в готовые css файлы
gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 11 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

/* Импортируем все библиотеки */
// Reset CSS
gulp.task('css', function() {
    return gulp.src([
        'node_modules/reset-css/reset.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({stream: true}))
});

// Перезагружаем при изменении html
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

// Перезагружаем при обновлении JS
gulp.task('script', function() {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

// Подключаем библиотеки
// jQuery
// GSAP
// gulp.task('js', function() {
//     return gulp.src([
//         'node_modules/jquery/dist/jquery.min.js',
//         'node_modules/gsap/dist/gsap.min.js',
//         'node_modules/gsap/dist/ScrollToPlugin.min.js',
//         ])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js'))
//         .pipe(browserSync.reload({stream: true}))
// });



// Bundle main JS file 
gulp.task('bundle-js', function() {
    return gulp.src([
        'app/js/script.js'
        ])
        .pipe(concat('script.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('app/dist/js'))
});

// Production bundle main JS file
gulp.task('production-bundle-js', function() {
    return gulp.src([
        'app/js/script.js'
        ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist/js'))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});


// Watcher - следит за изменениями в соотв. папках, при изменении запускает 
//                                          соотв. task'и (внутри которых есть перезагрузка)
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('bundle-js', 'script'))
});


gulp.task('default', gulp.parallel('css', 'scss', 'bundle-js', 'browser-sync','watch'));
gulp.task('build', gulp.parallel('css', 'scss', 'production-bundle-js'));
