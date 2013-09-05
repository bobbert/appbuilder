module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/public/js/lib/angular/angular.js',
      'app/public/js/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/public/js/lib/jquery/jquery*.js',
      'app/public/js/lib/bootstrap/bootstrap.js',
      'app/public/js/*.js',
      'app/public/js/lib/underscore.js',
      'app/public/js/controllers/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'       
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
