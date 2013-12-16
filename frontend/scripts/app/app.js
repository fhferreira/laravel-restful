define([
    'angular', 
    'angularCookies', 
    'angularRoute', 
    'angularResource',
    'angularBootstrap',
    'angularAnimate',

    // controllers
    'app/controllers/AppCtrl',
    'app/controllers/HeaderCtrl',
    'app/controllers/MessageCtrl',
        
    // modules
    'modules/login/login',
    'modules/dashboard/dashboard',
    'modules/sites/sites',
    'modules/settings/settings',
    'modules/profile/profile',
    'services/security/security'
], function (
    angular, 
    angularCookies, 
    angularRoute, 
    angularResource,
    angularBootstrap,
    angularAnimate,

    AppCtrl,
    HeaderCtrl,
    MessageCtrl,

    login,
    dashboard,
    sites,
    settings,
    profile,

    security
) {
    "use strict";
    
    /*
     *  module: app
     *  desc: app module is the core module and the parent of all modules
     */
    
    // defining app module
    var app = angular.module('app', ['ngCookies', 'ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap', login.name, dashboard.name, sites.name, settings.name, profile.name, security.name]);

    app.controller('AppCtrl', AppCtrl);
    app.controller('HeaderCtrl', HeaderCtrl);
    app.controller('MessageCtrl', MessageCtrl);

    // defining constants
    app.constant("API_KEY", "1234567890");
    app.constant("SESSION_COOKIE_NAME", "ssk-session");

    // $routeProvider configuration
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);
    
    // $httpProvider configuration
    app.config(['$httpProvider', function ($httpProvider) {
        /*
         *  Set common http headers
         */
        $httpProvider.defaults.headers.common = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8'
        };

        /*
         *  Http response interceptor
         */
        $httpProvider.responseInterceptors.push(function($q, $location, $rootScope) {
            return function (promise) {
                return promise.then(function (response) {
                    // if success HTTP status code 200
                    if (response.headers()['content-type'] === "application/json; charset=utf-8" || response.headers()['content-type'] === "application/json") {
                        if (response.data.code === 200 || response.data.code === 301) {
                            var payloadData = response.data.payload;
                            response.data = payloadData;
                            return response;
                        } else {
                            if (response.data.code === 401) { // Unauthorized
                                $rootScope.$broadcast('error', response.data.message || 'Error. Unauthorized');
                                //console.log(response.data.message);
                                $location.path('/login');
                            }
                            // @TODO: 403, redirect to dashboard

                            $rootScope.$broadcast('error', response.data.message || 'Error. Server is having a problem');
                            //console.log('Request error:', response);
                            return $q.reject(response);
                        }
                    }
                    return response;
                }, function (response) {
                    // if error (HTTP status code 4xx)
                    $rootScope.$broadcast('error', 'Error. Server is having a problem');
                    //console.log('Request error:', response);
                    return $q.reject(response);
                });
            };
        });
    }]);

    // $locationProvider configuration
    /*app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);*/

    app.run(['securityService', function(securityService) {
        securityService.init();
    }]);
    
    return app;
});
