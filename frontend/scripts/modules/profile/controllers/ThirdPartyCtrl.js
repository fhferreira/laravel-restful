define([], function () {
    "use strict";
    
    var dependencies = ['$scope', '$rootScope', '$location', '$window', 'securityService', 'userResource', 'authResource', 'user'];
    var ThirdPartyCtrl = function ($scope, $rootScope, $location, $window, securityService, userResource, authResource, user) {
        $scope.user = user;

        $scope.twitter = function () {
            if ($scope.user.twitter_oauth_token) {
                $scope.user.twitter_oauth_token = null;
                $scope.save();
            } else {
                authResource.oauth({
                    provider: "twitter",
                    redirect_to: $window.location.href,
                    session_id: securityService.getSession().id
                }).success(function (payload) {
                    var w = $window.open(payload, 'Twitter', "width=600 height=400"); 
                    //@TODO: unload is called couple times because of multiple redirects
                    w.addEventListener('unload', function (e) {
                        userResource.getMe().success(function (payload) {
                            $scope.user = payload;
                            securityService.setUser(payload);
                        });
                    });
                });
            }
        };
        $scope.facebook = function () {
            if ($scope.user.facebook_oauth_token) {
                $scope.user.facebook_oauth_token = null;
                $scope.save();
            } else {
                authResource.oauth2({
                    provider: "facebook",
                    redirect_to: $window.location.href,
                    session_id: securityService.getSession().id
                }).success(function (payload) {
                    var w = $window.open(payload, 'Facebook', "width=600 height=400"); 
                    //@TODO: unload is called couple times because of multiple redirects
                    w.addEventListener('unload', function (e) {
                        userResource.getMe().success(function (payload) {
                            $scope.user = payload;
                            securityService.setUser(payload);
                        });
                    });
                });
            }
        };
        $scope.instagram = function () {
            if ($scope.user.instagram_oauth_token) {
                $scope.user.instagram_oauth_token = null;
                $scope.save();
            } else {
                authResource.oauth2({
                    provider: "instagram",
                    redirect_to: $window.location.href,
                    session_id: securityService.getSession().id
                }).success(function (payload) {
                    var w = $window.open(payload, 'Instagram', "width=600 height=400"); 
                    //@TODO: unload is called couple times because of multiple redirects
                    w.addEventListener('unload', function (e) {
                        userResource.getMe().success(function (payload) {
                            $scope.user = payload;
                            securityService.setUser(payload);
                        });
                    });
                });
            }
        };

        $scope.$watch('user.twitter_oauth_token', function (newVal, oldVal) {
            if ((newVal === null && oldVal !== null) || (newVal !== null && oldVal === null)) {
                if ($scope.user.twitter_oauth_token) {
                    $rootScope.$broadcast('success', 'Twitter authorization successfull!');
                } else {
                    $rootScope.$broadcast('success', 'Twitter authorization has been revoked');
                }
            }
        });
        $scope.$watch('user.facebook_oauth_token', function (newVal, oldVal) {
            if ((newVal === null && oldVal !== null) || (newVal !== null && oldVal === null)) {
                if ($scope.user.facebook_oauth_token) {
                    $rootScope.$broadcast('success', 'Facebook authorization successfull!');
                } else {
                    $rootScope.$broadcast('success', 'Facebook authorization has been revoked');
                }
            }
        });
        $scope.$watch('user.instagram_oauth_token', function (newVal, oldVal) {
            if ((newVal === null && oldVal !== null) || (newVal !== null && oldVal === null)) {
                if ($scope.user.instagram_oauth_token) {
                    $rootScope.$broadcast('success', 'Instagram authorization successfull!');
                } else {
                    $rootScope.$broadcast('success', 'Instagram authorization has been revoked');
                }
            }
        });

        $scope.save = function () {
            userResource.update($scope.user.id, $scope.user).success(function (payload) {
                console.log("success!", payload);
            });
        };
    };

    ThirdPartyCtrl.$inject = dependencies;
    ThirdPartyCtrl.resolve = {
        user: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }]
    };

    return ThirdPartyCtrl; 
});

