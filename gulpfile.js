/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    //
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber');
    del = require('del');

// Notifications
var notifier = require('node-notifier'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

var cssError = function(e){
    var message = 'Line ' +e.line+ '\n' + e.file + e.message;
    notification(' ❌ SCSS Failed ❌ ', message, true);
    console.log(' ❌ SCSS Failed ❌ \n' + message);
    this.emit( 'end' );
}

var jsError = function(e){
    var message = 'Check Terminal \n' +e.message;
    notification(' ❌ JS Failed ❌ ', message, true);
    console.log(' ❌ JS Failed ❌ \n' + message);
    this.emit( 'end' );
}

function notification(title, message, icon){
    if (icon) {
        var icon = './dev/gulp/notifications/fail.png';
    } else {
        var icon = './dev/gulp/notifications/complete.png';
    }
    notifier.notify({
        title: title,
        message: message,
        icon: icon,
        sound: false,
        contentImage: icon,
    });
}

// Styles
gulp.task('styles', function() {

  return sass('dev/sass/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest('app/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('app/styles'))
    .pipe(plumber({ errorHandler: cssError }))
    .pipe(notify({
      title: 'Styles Task Complete',
      message: '💯',
      contentImage: './dev/gulp/notifications/happy_kanye.png',
      icon: './dev/gulp/notifications/complete.png',
      sound: false
    }));
});

// Scripts
gulp.task('scripts', function() {
  gulp.src(
    [
      'dev/js/scripts.js',
    ])
    .pipe(plumber({ errorHandler: jsError }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
  return gulp.src(
    [
      'dev/js/vendor/match-heights.min.js',
      'dev/js/vendor/slick.min.js',
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(notify({
      title: 'Scripts Task Complete',
      message: '💯',
      contentImage: './dev/gulp/notifications/happy_kanye.png',
      icon: './dev/gulp/notifications/complete.png',
      sound: false
    }));
});

// Images
gulp.task('images', function() {
  return gulp.src('dev/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('app/images'))
    .pipe(notify({
      title: 'Images Processed',
      message: '💯',
      contentImage: './dev/gulp/notifications/happy_kanye.png',
      icon: './dev/gulp/notifications/complete.png',
      sound: false
    }));
});

// Clean
gulp.task('clean', function() {
  return del(['app/styles', 'app/scripts', 'app/images'], {force: true});
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('dev/sass/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('dev/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('dev/images/*', ['images']);

});
