var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var config = require('./config/config');

gulp.task('test', function() {
  gulp.src('./tests/*.js', {read: false})
    .pipe(mocha({reporter: 'list'}))
    .on('error', gutil.log);
});

gulp.task('default', function() {
  var dev = config.dev;
  nodemon({
    script: 'server.js',
    ext: '*.js',
    env: dev.server,
    ignore: ['./node_modules']
  }).on('restart', function() {
    console.log('Restarting...');
  })

});
