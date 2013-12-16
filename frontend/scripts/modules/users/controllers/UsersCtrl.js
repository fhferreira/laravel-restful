define([], function () {
    "use strict";
    
    var dependencies = ['$scope', '$location', 'currentUser', 'users'];
    var UsersCtrl = function ($scope, $location, currentUser, users) {
        $scope.currentUser = currentUser;
        $scope.users = users;

        $scope.edit = function (id) {
            $location.path('/users/' + id);
        };
    };

    UsersCtrl.$inject = dependencies;
    UsersCtrl.resolve = {
        user: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }],
        users: ['$q', 'userResource', function ($q, userResource) {
            var deferred = $q.defer();
            userResource.find({}).success(function (payload) {
                deferred.resolve(payload);
            });

            return deferred.promise;
        }],
    };

    return UsersCtrl;
});

