var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var history = require('connect-history-api-fallback');
var jsonSass = require('gulp-json-sass');
var header = require('gulp-header');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var fontName = 'icons';

gulp.task('scripts', function(){
  browserify({
    entries: './src/js/index.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});


gulp.task('icons', function(){
  gulp.src(['./src/lib/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './src/lib/scss/_icons-template.scss',
      targetPath: '../../src/scss/base/_icons.scss',
      fontPath: '/fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true
    }))
    .pipe(gulp.dest('././public/fonts/'));
});

gulp.task('import-styles', function(){
  gulp.src('./bower_components/prism/themes/prism-twilight.css')
  .pipe(gulp.dest('./public'));
});

gulp.task('styles', function(){
  gulp.src('./src/scss/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write('.'))
  .pipe(minifyCSS())
  .pipe(autoprefix())
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});

gulp.task('scss-lint', function(){
  gulp.src('./src/scss/**/*.scss')
    .pipe(scsslint({
      'config': __dirname + '/scss-lint.yml',
      'verbose': true
    }))
    .pipe(scsslint.failReporter('E'));
});

gulp.task('colors', function(){
  var source = './src/lib/_colors.json';
  var banner = "// generated from <%= source %> by gulp-json-sass\n\n";
  gulp.src(source)
  .pipe(jsonSass())
  .pipe(header(banner, {source: source}))
  .pipe(gulp.dest('./src/scss/base/'));
});

gulp.task('server', ['icons', 'colors', 'import-styles', 'styles', 'scripts'], function(){
  connect.server({
    root: ['public'],
    livereload: true,
    middleware: function() {
      return [
        history()
      ]
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('src/lib/icons/**', ['icons']);
  gulp.watch('src/lib/scss/_icons-template.scss', ['icons']);
  gulp.watch('src/lib/_colors.json', ['colors']);
  gulp.watch('src/scss/**', ['scss-lint', 'styles']);
  gulp.watch('src/js/**', ['scripts']);
});

gulp.task('default', ['server', 'watch']);
