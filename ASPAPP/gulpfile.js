/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    gp_less = require('gulp-less'),
    gp_minify = require('gulp-minify-css'), 
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename');

var paths = {
    'dev': {
        'less':'./wwwroot/less/'
    },
    'assets': {
        'css': './wwwroot/css/',
        'js': './wwwroot/js/',
        'vendor': './wwwroot/lib/'
    }
}

var frameworks = {
    'bootstrap': './wwwroot/lib/bootstrap/dist/css/bootstrap.min.css',
    'foundation': './wwwroot/lib/foundation-sites/dist/foundation.min.css'
    //TODO: Include Semantic UI as third framework
}

gulp.task('compileLess', function () {
    return gulp.src([paths.dev.less + 'app.less'])
        .pipe(gp_less())
        .pipe(gp_concat('app.css'))
        .pipe(gulp.dest(paths.assets.css))
        .pipe(gp_minify({ keepSpecialComments: 0 }))
        .pipe(gp_rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.assets.css));
});

gulp.task('mashUpCss', ['compileLess'], function () {
    return gulp.src([frameworks.bootstrap, paths.assets.css + 'app.min.css'])
        .pipe(gp_concat('app.min.css'))
        .pipe(gulp.dest(paths.assets.css));
});

gulp.task('watch', function () {
    "use strict";
    gulp.watch(paths.dev.less + '/*.less', ['compileLess', 'mashUpCss']);
});


gulp.task('default', ['watch'], function () {
    console.log('Done building!');
});