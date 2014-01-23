define([
    'angular',
    'angularPlaceholdersImg',
    'angularFileUpload',
    'services/security/security',
    'resources/user/user',
    'resources/auth/auth',
    'directives/uploadButton/uploadButton',
    'modules/profile/controllers/ProfileCtrl',
    'modules/profile/controllers/BillingCtrl',
    'modules/profile/controllers/ThirdPartyCtrl'
], function (
    angular, 
    angularPlaceholdersImg,
    angularFileUpload,
    security,
    user,
    auth,
    uploadButton,
    ProfileCtrl,
    BillingCtrl,
    ThirdPartyCtrl
) {
    "use strict";

    var profile = angular.module('modules.profile', ['placeholders.img', angularFileUpload.name, security.name, user.name, auth.name, uploadButton.name]);

    profile.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'js/modules/profile/templates/profile.html',
            controller: ProfileCtrl,
            resolve: ProfileCtrl.resolve 
        });

        $routeProvider.when('/profile/:id', {
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
