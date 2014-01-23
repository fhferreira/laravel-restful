define([
    'angular', 
    'angularCookies', 
    'angularRoute', 
    'angularResource',
    'angularBootstrap',
    'angularAnimate',
    'angularFileUpload',

    // controllers
    'app/controllers/AppCtrl',
    'app/controllers/HeaderCtrl',
    'app/controllers/MessageCtrl',
        
    // modules
    'modules/login/login',
    'modules/dashboard/dashboard',
    'modules/users/users',
    'modules/settings/settings',
    'modules/profile/profile',

    //directives
    'directives/common/common',

    //filters
    'filters/common/common',

    // services
    'services/security/security',
    'services/uniqueId/uniqueId'
], function (
    angular, 
    angularCookies, 
    angularRoute, 
    angularResource,
    angularBootstrap,
    angularAnimate,
    angularFileUpload,

    AppCtrl,
    HeaderCtrl,
    MessageCtrl,

    login,
    dashboard,
    users,
    settings,
    profile,

    commonDirectives,
    commonFilters,

    security,
    uniqueId
) {
    "use strict";
    
    /*
     *  module: app
     *  desc: app module is the core module and the parent of all modules
     */
    
    // defining app module
    var app = angular.module('app', ['ngCookies', 'ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap', angularFileUpload.name, login.name, dashboard.name, users.name, settings.name, profile.name, commonDirectives.name, commonFilters.name, security.name, uniqueId.name]);

    app.controller('AppCtrl', AppCtrl);
    app.controller('HeaderCtrl', HeaderCtrl);
    app.controller('MessageCtrl', MessageCtrl);

    // defining constants
    app.constant("API_KEY", "1234567890");
    app.constant("SESSION_COOKIE_NAME", "session");
    app.constant("DEFAULT_ROUTE", "/dashboard");

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
        $httpProvider.responseInterceptors.push(function($q, $location, $rootScope, DEFAULT_ROUTE) {
            return function (promise) {
                return promise.then(function (response) {
                    // if success HTTP status code 200
                    if (response.headers()['content-type'] === "application/json; charset=utf-8" || response.headers()['content-type'] === "application/json") {
                        if (response.data.code === 200 || response.data.code === 302) {
                            var payloadData = response.data.payload;
                            response.data = payloadData;
                            return response;
                        } else {
                            if (response.data.code === 400) { // Bad Request
                                $rootScope.$broadcast('error', response.data.message || 'Error. Bad Request.');
                            } else if (response.data.code === 401) { // Unauthorized 
                                //$rootScope.$broadcast('error', response.data.message || 'Error. Unauthorized');
                                var currentPath = $location.path();
                                if (currentPath !== '/logout' && $location.path() !== '/login') {
                                    var ref = $location.$$url;
                                    $location.path('/logout').search({ref: ref});
                                }
                            } else if (response.data.code === 403) { // Forbidden
                                if ($location.path() !== DEFAULT_ROUTE) {
                                    $rootScope.$broadcast('error', response.data.message || 'Error. Forbidden.');
                                    $location.path(DEFAULT_ROUTE);
                                }
                            } else if (response.data.code === 404) { // Not Found
                                if ($location.path() !== DEFAULT_ROUTE) {
                                    $rootScope.$broadcast('error', response.data.message || 'Error. Not Found.');
                                    $location.path(DEFAULT_ROUTE);
                                }
                            } else {
                                $rootScope.$broadcast('error', response.data.message || 'Error. Server is having a problem');
                            }   
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

    app.run(['securityService', '$location', 'DEFAULT_ROUTE', function(securityService, $location, DEFAULT_ROUTE) {
        securityService.init();
        securityService.requestCurrentUser().then(function () {
            if (securityService.isAuthenticated()) {
                var query = $location.search();
                // last url / or default if none
                if (query.ref) {
                    $location.search({}).path(query.ref);
                }
            } else {
                $location.path('/login');
            }
        });
    }]);
    
    return app;
});
