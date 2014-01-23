require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'bower_components/jquery/jquery',
        es5shim: 'bower_components/es5-shim/es5-shim',
        es5sham: 'bower_components/es5-shim/es5-sham',
        underscore: 'bower_components/underscore/underscore',
        moment: 'bower_components/moment/moment',
        highcharts: 'bower_components/highcharts/highcharts',
        angular: 'bower_components/angular/angular',
        angularBootstrap: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        angularPlaceholdersImg: 'bower_components/angular-placeholders/src/img/img',
        angularPlaceholdersText: 'bower_components/angular-placeholders/src/text/text',
        angularFileUpload: 'lib/angular-file-upload',
        angularResource: 'bower_components/angular-resource/angular-resource',
        angularCookies: 'bower_components/angular-cookies/angular-cookies',
        angularAnimate: 'bower_components/angular-animate/angular-animate',
        angularRoute: 'bower_components/angular-route/angular-route'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        angularAnimate: {
            deps: ['angular']
        },
        angularBootstrap: {
            deps: ['angular']
        },
        angularPlaceholdersText: {
            deps: ['angular']
        },
        angularPlaceholdersImg: {
            deps: ['angular']
        },
        angularFileUpload: {
            deps: ['angular', 'es5shim']
        },
        angularRoute: {
            deps: ['angular']
        },
        angularCookies: {
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        moment: {
            exports: 'moment'
        },
        highcharts: {
            deps: ['jquery'],
            exports: 'Highcharts'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['jquery', 'angular', 'app/app'],
    function ($, angular, app) {
    "use strict";

    angular.bootstrap(document, [app.name]);
});
