define([], function () {
    "use strict";

    var dependencies = ['$scope', '$rootScope', '$location', 'authResource', 'securityService'];
    var LoginCtrl = function ($scope, $rootScope, $location, authResource, securityService) {
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
                    $location.path('/dashboard');
                });
            }
        };
    };
    
    LoginCtrl.$inject = dependencies;
    LoginCtrl.resolve = {
        authenticated: function (securityService, $location) {
            if (securityService.isAuthenticated()) {
                $location.path('/dashboard');
            }
        }
    };
    return LoginCtrl;
});

