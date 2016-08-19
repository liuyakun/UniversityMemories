var gulp = require('gulp');
var newer = require('gulp-newer');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var path = require('path');
var debug = require('gulp-debug');

var paths = {};

paths.less = {
    src: 'src/main/resources/static/css/**/*.less',
    dst: 'src/main/resources/static/css/'
};

gulp.task('less', function(){
    return gulp.src(paths.less.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.less.dst));
});

gulp.task('clean-less', function(){
    return del([
        path.join(paths.less.dst, 'mgr/manager.css'),
        path.join(paths.less.dst, 'mgr/manager.css.map')
    ]);
});

paths.requirejs = {
    src: 'src/main/resources/static/script/lib/requirejs/require.js',
    dst: 'src/main/resources/static/script/lib/requirejs/'
};
gulp.task('require.min.js', function(){
    return gulp.src(paths.requirejs.src)
        .pipe(newer(path.join(paths.requirejs.dst,'require.min.js')))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('require.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.requirejs.dst));
});

paths.chai = {
    src: 'src/main/resources/static/script/lib/chai/chai.js',
    dst: 'src/main/resources/static/script/lib/chai/'
};
gulp.task('chai.min.js', function(){
    return gulp.src(paths.chai.src)
        .pipe(newer(path.join(paths.chai.dst,'chai.min.js')))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('chai.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.chai.dst));
});

paths.ajaxfileupload = {
    src: 'src/main/resources/static/script/lib/ajaxfileupload/ajaxfileupload.js',
    dst: 'src/main/resources/static/script/lib/ajaxfileupload/'
};
gulp.task('ajaxfileupload.min.js', function(){
    return gulp.src(paths.ajaxfileupload.src)
        .pipe(newer(path.join(paths.ajaxfileupload.dst,'ajaxfileupload.min.js')))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('ajaxfileupload.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.ajaxfileupload.dst));
});

gulp.task('clean-min-js', function(){
    return del([
        path.join(paths.requirejs.dst, 'require.min.js'),
        path.join(paths.requirejs.dst, 'require.min.js.map'),
        path.join(paths.chai.dst, 'chai.min.js'),
        path.join(paths.chai.dst, 'chai.min.js.map'),
        path.join(paths.chai.dst, 'ajaxfileupload.min.js'),
        path.join(paths.chai.dst, 'ajaxfileupload.min.js.map')
    ]);
});

gulp.task('build', ['less', 'require.min.js', 'chai.min.js','ajaxfileupload.min.js']);

gulp.task('clean-log', function(){
    return del(['Rental.log', 'Rental.log.*']);
});

gulp.task('clean', ['clean-less', 'clean-min-js', 'clean-log']);

paths.static = {
    src: 'src/main/resources/static/**/*',
    dst: 'build/resources/main/static/'
};
gulp.task('hotswap-static', function(){
    return gulp.src(paths.static.src)
        .pipe(changed(paths.static.dst))
        .pipe(debug({ title: 'hotswap detected : ' }))
        .pipe(gulp.dest(paths.static.dst));
});

paths.templates = {
    src: 'src/main/resources/templates/**/*',
    dst: 'build/resources/main/templates/'
};
gulp.task('hotswap-template', function(){
    return gulp.src(paths.templates.src)
        .pipe(changed(paths.templates.dst))
        .pipe(debug({ title: 'hotswap detected : ' }))
        .pipe(gulp.dest(paths.templates.dst));
});

gulp.task('watch', function(){
    return gulp.watch([paths.static.src, paths.templates.src], ['hotswap-static', 'hotswap-template']);
});

gulp.task('default', ['build']);