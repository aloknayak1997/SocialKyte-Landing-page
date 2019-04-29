const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const scripts = require('./scripts');
const styles = require('./styles');
var fs = require('fs');
var request = require('request');
var devMode = false;
var s3 = require("gulp-s3");
var version = require('gulp-version-number');
var path = require('path');

var versionConfig = {
    value: '%MDS%',
    append: {
      key: 'v',
      to: ['css', 'js'],
    },
};

gulp.task('html', function () {
    return gulp.src(path.join(__dirname, SOUCE_DIRECTORY, 'index.html'))
      .pipe(version(versionConfig))
      .pipe(gulp.dest(path.join(__dirname, DIST_DIRECTORY)));
});
  
gulp.task('deploy', ['build'], function () {
    return gulp.src('./app/**/*').pipe(s3(require('./aws.json')));
});

gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./app/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./app/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// gulp.task('receipt-js', function () {
//     return request('https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js').pipe(fs.createWriteStream('./app/Vue.js'));
// });


gulp.task('build', function () {
    gulp.start(['css', 'js'])
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'app/',
        }
    });
});

gulp.task('start', function () {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./app/static/css/**/*.css'], ['css']);
    gulp.watch(['./app/static/js/**/*.js'], ['js']);
    // gulp.watch(['./app/templates/**/*.html'], ['html']);
});

// //--------------------


