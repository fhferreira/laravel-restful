define([], function () {
    "use strict";

    var dependencies = ['$scope', '$rootScope', '$location', 'userResource', 'authResource', 'securityService', 'DEFAULT_ROUTE'];
    var SignupCtrl = function ($scope, $rootScope, $location, userResource, authResource, securityService, DEFAULT_ROUTE) {
        $scope.user = userResource.defaults;
        $scope.specialties = specialties;
        $scope.submit = function () {
            $scope.form.$setDirty();

            if ($scope.form.$valid) {
                authResource.register($scope.user).success(function (payload) {
                    securityService.init(payload);
                    $rootScope.$broadcast('success', 'Welcome!');
                    $location.path(DEFAULT_ROUTE);
                });
            }
        };
    };
    
    SignupCtrl.$inject = dependencies;
    SignupCtrl.resolve = {
    };
    return SignupCtrl;
});

