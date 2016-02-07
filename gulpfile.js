var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');

gulp.task('test', function() {
  gulp.src('./tests/*.js')
    .pipe(jasmine());
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
