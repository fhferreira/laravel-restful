define(['underscore'], function (_) {
    "use strict";
    
    var dependencies = ['$scope', '$location', '$modal', 'userResource', 'currentUser', 'user'];
    var UserCtrl = function ($scope, $location, $modal, userResource, currentUser, user) {
        $scope.currentUser = currentUser;
        $scope.user = user;
    };

    UserCtrl.$inject = dependencies;
    UserCtrl.resolve = {
        currentUser: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }],
        user: ['$route', '$q', 'userResource', function ($route, $q, userResource) {
            var id = $route.current.params.id;
            var deferred = $q.defer();
            if (id === 'new') {
                deferred.resolve(userResource.defaults);
            } else {
                userResource.get(id, {}).success(function (payload) {
                    deferred.resolve(payload);
                });
            }

            return deferred.promise;
        }],
    };

    return UserCtrl;
});

