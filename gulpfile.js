'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    inject = require('gulp-inject'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['js']);
})

gulp.task('browser-sync', function () {
    var files = [
        './**/*.html',
        './css/**/*.css',
        './sass/**/*.png',
        './js/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('js', function () {
    gulp.src('./js/*.js')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream: true}));
});

gulp.task('build', ['sass', 'js', 'browser-sync', 'watch']);


gulp.task('default', function(){
    gulp.run('build');
});

gulp.task('index', function () {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src('./*.js', {read: false}), {relative: true}))
        .pipe(gulp.dest('./src'));
});

