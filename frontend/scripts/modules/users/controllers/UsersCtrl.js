define([], function () {
    "use strict";
    
    var dependencies = ['$scope', '$location', 'currentUser', 'results', 'userResource'];
    var UsersCtrl = function ($scope, $location, currentUser, results, userResource) {
        $scope.currentUser = currentUser;
        $scope.results = results;

        $scope.goTo = function (page) {
            $location.search({page: page});
        };

        $scope.getTotalPages = function () {
            return $scope.results.last_page;
        };

        $scope.$on('$routeUpdate', function () {
            userResource.find($location.search()).success(function (payload) {
                $scope.results = payload;
            });
        });

        $scope.edit = function (id) {
            $location.path('/users/' + id);
        };
    };

    UsersCtrl.$inject = dependencies;
    UsersCtrl.resolve = {
        currentUser: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }],
        results: ['$q', 'userResource', '$location', function ($q, userResource, $location) {
            var deferred = $q.defer();
            userResource.find($location.search()).success(function (payload) {
                deferred.resolve(payload);
            });

            return deferred.promise;
        }],
    };

    return UsersCtrl;
});

