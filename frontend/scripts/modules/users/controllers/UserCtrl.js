define(['underscore'], function (_) {
    "use strict";
    
    var dependencies = ['$rootScope', '$scope', '$location', '$modal', 'userResource', 'currentUser', 'user'];
    var UserCtrl = function ($rootScope, $scope, $location, $modal, userResource, currentUser, user) {
        $scope.currentUser = currentUser;
        $scope.user = user;

        $scope.statuses = [
            {"key": "pending", "label": "pending"},
            {"key": "active", "label": "active"},
            {"key": "inactive", "label": "inactive"},
            {"key": "banned", "label": "banned"}
        ];
        $scope.groups = [
            {"key": 1, "label": "admin"},
            {"key": 2, "label": "member"}
        ];

        // save
        $scope.save = function () {
            $scope.form.$setDirty();
            
            console.log('user: ', $scope.user);
            if ($scope.form.$valid) {
                if ($scope.user.id) {
                    userResource.update($scope.user.id, $scope.user).success(function (payload) {
                        $rootScope.$broadcast('success', 'User has been updated successfully!');
                        console.log("success!", payload);
                    });
                } else {
                    userResource.create($scope.user).success(function (payload) {
                        $rootScope.$broadcast('success', 'User has been created successfully!');
                        $location.path('/users/' + payload.id);
                        console.log("success!", payload);
                    });
                }
            }
        };
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

