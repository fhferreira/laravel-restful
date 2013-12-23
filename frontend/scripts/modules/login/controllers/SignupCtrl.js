define([], function () {
    "use strict";

    var dependencies = ['$scope', '$rootScope', '$location', 'userResource', 'authResource', 'securityService', 'specialties'];
    var SignupCtrl = function ($scope, $rootScope, $location, userResource, authResource, securityService, specialties) {
        $scope.user = userResource.defaults;
        $scope.specialties = specialties;
        $scope.submit = function () {
            $scope.form.$setDirty();

            if ($scope.form.$valid) {
                authResource.register($scope.user).success(function (payload) {
                    securityService.init(payload);
                    $rootScope.$broadcast('success', 'Welcome!');
                    $location.path('/dashboard');
                });
            }
        };
    };
    
    SignupCtrl.$inject = dependencies;
    SignupCtrl.resolve = {
        specialties: ['$q', 'specialtyResource', '$location', function ($q, specialtyResource, $location) {
            var deferred = $q.defer();
            // check if user logged in
            specialtyResource.find().success(function(payload) {
                deferred.resolve(payload);
            });
            return deferred.promise;
        }]
    };
    return SignupCtrl;
});

