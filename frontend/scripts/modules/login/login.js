define([
    'angular',
    'modules/login/controllers/LoginCtrl',
    'modules/login/controllers/LogoutCtrl',
    'modules/login/controllers/SignupCtrl',
    'services/security/security',
    'resources/auth/auth',
    'resources/specialty/specialty'
], function (angular, LoginCtrl, LogoutCtrl, SignupCtrl, security, auth, specialty) {
    "use strict";

    var login = angular.module('modules.login', [security.name, auth.name, specialty.name]);

    login.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'js/modules/login/templates/login.html',
            controller: LoginCtrl,
            resolve: LoginCtrl.resolve 
        });
        $routeProvider.when('/logout', {
            templateUrl: 'js/modules/login/templates/logout.html',
            controller: LogoutCtrl,
            resolve: LogoutCtrl.resolve 
        });
        $routeProvider.when('/signup', {
            templateUrl: 'js/modules/login/templates/signup.html',
            controller: SignupCtrl,
            resolve: SignupCtrl.resolve 
        });
    }]);

    return login;
});
