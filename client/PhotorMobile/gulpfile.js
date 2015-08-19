'use strict';

var gulp   = require('gulp');
var gutil  = require('gulp-util');
var wrench = require('wrench');

/*
  ==========================
  Basic Options
  ==========================
*/
var options = {
  src          : 'src',
  dist         : 'www',
  tmp          : 'dev',
  e2e          : 'e2e',
  srcEnv       : 'dev/serve/app/project/scripts/environment',
  distEnv      : 'www',
  errorHandler : function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },

  wiredep: {
    directory: 'bower_components',
    exclude: [
      /bootstrap-sass-official\/.*\.js/,
      /bootstrap\.css/,
      'bower_components/angular-input-masks'
    ]
  },

};

/*
  ==========================
  Specs
  ==========================
*/
options.specFiles = [
  options.src + '/**/*.spec.js',
  options.tmp + '/**/*.spec.js',
  options.src + '/**/*.mock.js',
  options.tmp + '/**/*.mock.js'
]

/*
  ==========================
  Custom Excludes
  ==========================
*/
options.excludes = {
  stylesFromIndexImport: [
    options.src + '/app/index.scss',
    options.src + '/app/vendor.scss',
    options.src + '/app/project/styles/**/*.scss'
  ]
};


/*
  ==========================
  Read gulp files
  ==========================
*/
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});


/*
  ==========================
  Default Task
  ==========================
*/
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
