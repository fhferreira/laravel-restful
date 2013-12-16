define([], function () {
    "use strict";
    
    var dependencies = ['$scope', '$rootScope', '$location', '$modal', 'securityService', 'userResource', 'user'];
    var ProfileCtrl = function ($scope, $rootScope, $location, $modal, securityService, userResource, user) {
        $scope.user = user;

        // save
        $scope.save = function () {
            $scope.form.$setDirty();

            console.log('user: ', $scope.user);
            if ($scope.form.$valid) {
                userResource.updateMe($scope.user).success(function (payload) {
                    securityService.setUser(payload);
                    console.log("success!", payload);
                    $rootScope.$broadcast('success', 'Profile has been updated successfully!');
                });
            }
        };
    };

    ProfileCtrl.$inject = dependencies;
    ProfileCtrl.resolve = {
        user: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }]
    };

    return ProfileCtrl; 
});

