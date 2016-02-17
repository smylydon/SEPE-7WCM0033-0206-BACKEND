var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var config = require('./config/config');

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

gulp.task('lint', function() {
  gulp.src(['*.js','./models/**/*.js','./controllers/**/*.js','./routes/**/*.js'])
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
    tasks: ['lint', 'test'],
    ignore: ['./node_modules']
  }).on('restart', function() {
    console.log('Restarting...');
  });

});
