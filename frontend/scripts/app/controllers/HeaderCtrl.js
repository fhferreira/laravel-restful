define([], function () {
    "use strict";

    var dependencies = ['securityService', '$scope', '$location', '$rootScope'];
    var HeaderCtrl = function (securityService, $scope, $location, $rootScope) {
        $scope.isActive = function (routePattern) {
            if ((new RegExp("^" + routePattern + ".*")).test($location.path())) {
                return true;
            }
            return false;
        };
        
        $scope.isAuthenticated = securityService.isAuthenticated();
        $scope.isAdmin = function () {
            if ($scope.isAuthenticated) {
                if ($scope.user.group.name == 'admin') {
                    return true;
                }
            }
            return false; 
        };
        if ($scope.isAuthenticated) {
            securityService.requestCurrentUser().then(function (user) {
                $scope.user = user;
            });
        }

        $scope.$on('authChange', function(event){
            $scope.isAuthenticated = securityService.isAuthenticated();
            if ($scope.isAuthenticated) {
                securityService.requestCurrentUser().then(function (user) {
                    $scope.user = user;
                });
            } else {
                $scope.user = null;
            }
        });

        $scope.logout = function () {
            securityService.destroySession();
            //$scope.isAuthenticated = securityService.isAuthenticated();
            //$scope.user = null;
            $location.path('/login');
        };
    };
    
    HeaderCtrl.$inject = dependencies;

    return HeaderCtrl;
});
