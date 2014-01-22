define([
    'angular',
    'modules/login/controllers/LoginCtrl',
    'modules/login/controllers/LogoutCtrl',
    'modules/login/controllers/SignupCtrl',
    'services/security/security',
    'resources/auth/auth'
], function (angular, LoginCtrl, LogoutCtrl, SignupCtrl, security, auth) {
    "use strict";

    var login = angular.module('modules.login', [security.name, auth.name]);

    login.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'js/modules/login/templates/login.html',
            controller: LoginCtrl,
            resolve: LoginCtrl.resolve 
        });
        $routeProvider.when('/logout', {
            controller: LogoutCtrl
        });
        $routeProvider.when('/signup', {
            templateUrl: 'js/modules/login/templates/signup.html',
            controller: SignupCtrl,
            resolve: SignupCtrl.resolve 
        });
    }]);

    return login;
});
