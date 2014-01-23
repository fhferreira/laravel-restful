define([], function () {
    "use strict";
    
    var dependencies = ['$fileUploader', '$http', '$scope', '$rootScope', '$location', '$modal', 'securityService', 'userResource', 'user', 'currentUser'];
    var ProfileCtrl = function ($fileUploader, $http, $scope, $rootScope, $location, $modal, securityService, userResource, user, currentUser) {
        $scope.user = user || currentUser;
        $scope.currentUser = currentUser;
        if ($scope.currentUser.id !== $scope.user.id) {
            $scope.readOnly = true;
        }
        $scope.token = $http.defaults.headers.common["Authorization"];

        $scope.openUploadProfileImageModal = function () {
            if ($scope.readOnly) {
                return;
            }
            var $parentScope = $scope;
            var modal = $modal.open({
                backdrop: true,
                keyboard: true,
                templateUrl:  '/js/modules/profile/templates/_update_profile_image.html',
                controller: function DialogController($scope, $modalInstance, $sce) {
                    $scope.user = angular.copy($parentScope.user);
                    $scope.token = $parentScope.token;

                    // create a uploader with options
                    var uploader = $scope.uploader = $fileUploader.create({
                        scope: $scope,
                        url: '/api/upload',
                        headers: {"Authorization": $scope.token},
                        autoUpload: true,
                        removeAfterUpload: true,
                        formData: [],
                        filters: []
                    });

                    uploader.bind('complete', function (event, xhr, item, response) {
                        $scope.user.meta.profile_img_url = response.payload.url;
                    });

                    $scope.save = function (user) {
                        $modalInstance.close(user);
                    };
                    $scope.cancel = function () {
                        $modalInstance.close();
                    };
                }
            }); 
                
            modal.result.then(function (user) {
                if (user) {
                    $scope.user = user;
                    $scope.save();
                }
            });
        };

        // save
        $scope.save = function () {
            if ($scope.readOnly) {
                return;
            }
            $scope.form.$setDirty();

            console.log('user: ', $scope.user);
            if ($scope.form.$valid) {
                userResource.updateMe($scope.user).success(function (payload) {
                    securityService.setUser(payload);
                    console.log("success!", payload);
                    $rootScope.$broadcast('success', 'Profile has been updated successfully!');
                });
            }
        };
    };

    ProfileCtrl.$inject = dependencies;
    ProfileCtrl.resolve = {
        user: ['securityService', '$route', '$q', 'userResource', function (securityService, $route, $q, userResource) {
            var id = $route.current.params.id;
            if (id) {
                var deferred = $q.defer();
                userResource.get(id, {}).success(function (payload) {
                    deferred.resolve(payload);
                });
                return deferred.promise;
            } else {
                return null;
            }

        }],
        currentUser: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }]
    };

    return ProfileCtrl; 
});

