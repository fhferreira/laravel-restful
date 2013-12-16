define([], function () {
    "use strict";
    
    var dependencies = ['$scope', '$location', 'user', 'sites'];
    var SitesCtrl = function ($scope, $location, user, sites) {
        $scope.user = user;
        $scope.sites = sites;

        $scope.edit = function (id) {
            $location.path('/sites/' + id);
        };
    };

    SitesCtrl.$inject = dependencies;
    SitesCtrl.resolve = {
        user: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }],
        sites: ['$q', 'siteResource', function ($q, siteResource) {
            var deferred = $q.defer();
            siteResource.find({}).success(function (payload) {
                deferred.resolve(payload);
            });

            return deferred.promise;
        }],
    };

    return SitesCtrl;
});

