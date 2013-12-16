define([
    'angular',
    'services/security/security',
    'resources/site/site',
    'modules/sites/controllers/SitesCtrl',
    'modules/sites/controllers/SiteCtrl'
], function (
    angular, 
    security,
    site,
    SitesCtrl,
    SiteCtrl
) {
    "use strict";

    var sites = angular.module('modules.sites', [security.name, site.name]);

    sites.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sites', {
            templateUrl: 'js/modules/sites/templates/sites.html',
            controller: SitesCtrl,
            resolve: SitesCtrl.resolve
        });

        $routeProvider.when('/sites/:id', {
            templateUrl: 'js/modules/sites/templates/site.html',
            controller: SiteCtrl,
            resolve: SiteCtrl.resolve 
        });
    }]);

    return sites;
});
