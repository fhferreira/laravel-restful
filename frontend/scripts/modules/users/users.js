define([
    'angular',
    'angularPlaceholdersImg',
    'services/security/security',
    'resources/user/user',
    'modules/users/controllers/UsersCtrl',
    'modules/users/controllers/UserCtrl'
], function (
    angular, 
    angularPlaceholdersImg,
    security,
    user,
    UsersCtrl,
    UserCtrl
) {
    "use strict";

    var users = angular.module('modules.users', ['placeholders.img', security.name, user.name]);

    users.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'js/modules/users/templates/users.html',
            controller: UsersCtrl,
            resolve: UsersCtrl.resolve,
            reloadOnSearch: false,
        });

        $routeProvider.when('/users/:id', {
            templateUrl: 'js/modules/users/templates/user.html',
            controller: UserCtrl,
            resolve: UserCtrl.resolve 
        });
    }]);

    return users;
});
