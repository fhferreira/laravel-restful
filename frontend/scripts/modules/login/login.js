define([
    'angular',
    'modules/login/controllers/LoginCtrl',
    'services/security/security',
    'resources/auth/auth'
], function (angular, LoginCtrl, security, auth) {
    "use strict";

    var login = angular.module('modules.login', [security.name, auth.name]);

    login.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'js/modules/login/templates/login.html',
            controller: LoginCtrl,
            resolve: LoginCtrl.resolve 
        });
    }]);

    return login;
});
