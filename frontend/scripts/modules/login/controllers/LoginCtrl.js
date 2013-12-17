define([], function () {
    "use strict";

    var dependencies = ['$scope', '$rootScope', '$location', 'authResource', 'securityService'];
    var LoginCtrl = function ($scope, $rootScope, $location, authResource, securityService) {
        $scope.username = "";
        $scope.password = "";
        $scope.submit = function () {
            authResource.login({
                username: $scope.username,
                password: $scope.password
            }).success(function (payload) {
                securityService.init(payload);
                $rootScope.$broadcast('success', 'Welcome!');
                $location.path('/dashboard');
            });
        };
    };
    
    LoginCtrl.$inject = dependencies;
    LoginCtrl.resolve = {
        user: ['$q', 'securityService', '$location', function ($q, securityService, $location) {
            var deferred = $q.defer();
            // check if user logged in
            securityService.requestCurrentUser().then(function(payload) {
                if (securityService.isAuthenticated()) {
                    // redirect to dashboard if they are logged in
                    $location.path('/dashboard');
                } else {
                    deferred.resolve(payload);
                }
            });
            return deferred;
        }]
    };
    return LoginCtrl;
});

