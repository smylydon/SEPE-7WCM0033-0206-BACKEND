var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.src('./tests/*.js', {read: false})
    .pipe(mocha({reporter: 'list'}))
    .on('error', gutil.log);
});

gulp.task('default', function() {
  nodemon({
    script: 'server.js',
    ext: '*.js',
    env: {
      PORT: 8000,
      JWT_SECRET: 'bobulousquest',
      MONGO_URL: 'mongodb://localhost/jwttutorial'
    },
    ignore: ['./node_modules']
  }).on('restart', function() {
    console.log('Restarting...');
  })

});
