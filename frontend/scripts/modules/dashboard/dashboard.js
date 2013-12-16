define([
    'angular',
    'services/security/security',
    'directives/highCharts/highCharts',
    'modules/dashboard/controllers/DashboardCtrl'
], function (
    angular, 
    highCharts,
    security, 
    DashboardCtrl
) {
    "use strict";

    var dashboard = angular.module('modules.dashboard', [highCharts.name, security.name]);

    dashboard.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'js/modules/dashboard/templates/dashboard.html',
            controller: DashboardCtrl,
            resolve: DashboardCtrl.resolve
        });
    }]);

    return dashboard;
});
