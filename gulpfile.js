var gulp = require('gulp');
var gutil = require('gulp-util');
var jscs = require('gulp-jscs');
var jscsstylish = require('gulp-jscs-stylish');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var config = require('./config/config');

var jsFiles = ['*.js', './models/**/*.js', './controllers/**/*.js', './routes/**/*.js'];
gulp.task('test', function() {
    process.env = {
        serverName: 'test'
    };
    gulp.src('./tests/*.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'list'
        }))
        .on('error', gutil.log);
});

gulp.task('jscs', function() {
    return gulp.src(jsFiles)
        .pipe(jscs())
        .pipe(jscsstylish());
});

gulp.task('lint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('default', function() {
    var dev = config.dev;
    nodemon({
        script: 'server.js',
        ext: '*.js',
        env: dev.server,
        tasks: ['jscs','lint', 'test'],
        ignore: ['./node_modules']
    }).on('restart', function() {
        console.log('Restarting...');
    });

});
