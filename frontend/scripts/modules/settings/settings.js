define([
    'angular',
    'services/security/security',
    'resources/auth/auth',
    'modules/settings/controllers/SettingsCtrl'
], function (
    angular, 
    security,
    auth,
    SettingsCtrl
) {
    "use strict";

    var settings = angular.module('modules.settings', [security.name, auth.name]);

    settings.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'js/modules/settings/templates/settings.html',
            controller: SettingsCtrl,
            resolve: SettingsCtrl.resolve 
        });
    }]);

    return settings;
});
