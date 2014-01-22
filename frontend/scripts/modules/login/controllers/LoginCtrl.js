define([], function () {
    "use strict";

    var dependencies = ['$scope', '$rootScope', '$location', 'authResource', 'securityService', 'DEFAULT_ROUTE'];
    var LoginCtrl = function ($scope, $rootScope, $location, authResource, securityService, DEFAULT_ROUTE) {
        $scope.username = "";
        $scope.password = "";
        $scope.submit = function () {
            $scope.form.$setDirty();
            if ($scope.form.$valid) {
                authResource.login({
                    username: $scope.username,
                    password: $scope.password
                }).success(function (payload) {
                    securityService.init(payload);
                    $rootScope.$broadcast('success', 'Welcome!');
                    $location.path(DEFAULT_ROUTE);
                });
            }
        };
    };
    
    LoginCtrl.$inject = dependencies;
    LoginCtrl.resolve = {
        authenticated: function (securityService, $location, DEFAULT_ROUTE) {
            if (securityService.isAuthenticated()) {
                $location.path(DEFAULT_ROUTE);
            }
        }
    };
    return LoginCtrl;
});

