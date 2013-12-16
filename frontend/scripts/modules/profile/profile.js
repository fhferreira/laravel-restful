define([
    'angular',
    'services/security/security',
    'resources/user/user',
    'resources/auth/auth',
    'modules/profile/controllers/ProfileCtrl',
    'modules/profile/controllers/BillingCtrl',
    'modules/profile/controllers/ThirdPartyCtrl'
], function (
    angular, 
    security,
    auth,
    user,
    ProfileCtrl,
    BillingCtrl,
    ThirdPartyCtrl
) {
    "use strict";

    var profile = angular.module('modules.profile', [security.name, user.name, auth.name]);

    profile.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'js/modules/profile/templates/profile.html',
            controller: ProfileCtrl,
            resolve: ProfileCtrl.resolve 
        });

        $routeProvider.when('/profile/billing', {
            templateUrl: 'js/modules/profile/templates/billing.html',
            controller: BillingCtrl,
            resolve: BillingCtrl.resolve
        });

        $routeProvider.when('/profile/thirdparty', {
            templateUrl: 'js/modules/profile/templates/thirdparty.html',
            controller: ThirdPartyCtrl,
            resolve: ThirdPartyCtrl.resolve 
        });
    }]);

    return profile;
});
