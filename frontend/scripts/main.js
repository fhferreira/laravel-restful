require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'bower_components/jquery/jquery',
        underscore: 'bower_components/underscore/underscore',
        moment: 'bower_components/moment/moment',
        highcharts: 'bower_components/highcharts/highcharts',
        angular: 'bower_components/angular/angular',
        angularBootstrap: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
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
