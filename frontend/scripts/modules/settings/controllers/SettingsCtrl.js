define(['underscore'], function (_) {
    "use strict";
    
    var dependencies = ['$scope', '$location', '$modal', 'authResource', 'user'];
    var SettingsCtrl = function ($scope, $location, $modal, authResource, user) {
        $scope.user = user;
    };

    SettingsCtrl.$inject = dependencies;
    SettingsCtrl.resolve = {
        user: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }]
    };

    return SettingsCtrl;
});

