var gulp = require('gulp'),
  fs = require('fs'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  babelify = require("babelify"),
	gsap = require("gsap");
	glslify = require("glslify");

  var browserSync = require('browser-sync').create();


function compileJS(file){
  return browserify('src/'+file+'.js',{debug:true})
    .transform(babelify)
    .transform('glslify')
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(file+'.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('demo/js'));
}
// gulp.task('default',['js1','js2','js3'],function(){});
gulp.task('build',['js1','js2','js3'],function(){});
gulp.task('js1',function(){
  return compileJS('index');
});
gulp.task('js2',function(){
  return compileJS('index2');
});
gulp.task('js3',function(){
  return compileJS('index3');
});


// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js1'], function (done) {
  browserSync.reload();
  done();
});


// Static server
gulp.task('default', ['js1'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("src/*.js", ['js-watch']);
});