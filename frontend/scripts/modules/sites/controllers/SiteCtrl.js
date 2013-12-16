define(['underscore'], function (_) {
    "use strict";
    
    var dependencies = ['$window', '$scope', '$rootScope', '$location', '$modal', 'siteResource', 'user', 'categories', 'themes', 'site'];
    var SiteCtrl = function ($window, $scope, $rootScope, $location, $modal, siteResource, user, categories, themes, site) {
        $scope.user = user;
        $scope.site = site;

        $scope.embedCode = "<script src='" + $window.location.protocol + "//" + $window.location.host + "/site/embed.js' data-ssk-site='" + $scope.site.id + "' data-widget-height='800'></script>";
        $scope.highlight = function ($event) {
            var range;                              
            if (document.selection) { 
                range = document.body.createTextRange();
                range.moveToElementText($event.target);
                range.select();
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode($event.target);
                window.getSelection().addRange(range);
            }
        };

        $scope.search_terms = "";
        if (site.subscriptions.length > 0) {
            $scope.search_terms = $scope.site.subscriptions[0].search_terms;
        }
        $scope.$watch('search_terms', function (newVal, oldVal) {
            if (typeof(newVal) === 'undefined') {
                newVal = "";
            }
            _.each($scope.site.subscriptions, function (subscription) {
                if (!subscription.is_official) {
                    subscription.search_terms = newVal.trim(); //@TODO: trim
                }
            });
        });

        $scope.tags = site.tags.join(",");
        $scope.$watch('tags', function (newVal, oldVal) {
            $scope.site.tags = newVal.split(","); //@TODO: trim
        });
        
        $scope.blacklisted_keywords = "";
        if (site.subscriptions.length > 0) {
            $scope.blacklisted_keywords = $scope.site.subscriptions[0].blacklisted_keywords.join(",");
        }
        $scope.$watch('blacklisted_keywords', function (newVal, oldVal) {
            if (typeof(newVal) === 'undefined') {
                newVal = "";
            }
            var blacklisted_keywords = newVal.split(","); //@TODO: trim
            _.each($scope.site.subscriptions, function (subscription) {
                subscription.blacklisted_keywords = blacklisted_keywords;
            });
        });

        $scope.has_profanity_filter = false;
        if (site.subscriptions.length > 0) {
            $scope.has_profanity_filter = $scope.site.subscriptions[0].has_profanity_filter;
        }
        $scope.$watch('has_profanity_filter', function (newVal, oldVal) {
            _.each($scope.site.subscriptions, function (subscription) {
                subscription.has_profanity_filter = newVal;
            });
        });

        $scope.categories = categories;
        $scope.themes = themes;
        
        // save
        $scope.save = function () {
            $scope.form.$setDirty();
            
            console.log('site: ', $scope.site);
            if ($scope.form.$valid) {
                if ($scope.site.id) {
                    siteResource.update($scope.site.id, $scope.site).success(function (payload) {
                        $rootScope.$broadcast('success', 'Site has been updated successfully!');
                        console.log("success!", payload);
                    });
                } else {
                    siteResource.create($scope.site).success(function (payload) {
                        $rootScope.$broadcast('success', 'Site has been created successfully!');
                        $location.path('/sites/' + payload.id);
                        console.log("success!", payload);
                    });
                }
            }
        };

        // delete
        $scope.delete = function (site) {
            var dialog = $modal.open({
                backdrop: true,
                keyboard: true,
                templateUrl:  'js/modules/sites/templates/dialog-confirm-delete.html',
                controller: function DialogController($scope, $modalInstance) {
                    $scope.ok = function () {
                        siteResource.delete(site.id, $scope.site).success(function (payload) {
                            $location.path('/sites');
                            $modalInstance.close();
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.close();
                    };
                }
            });
        };

        // has official subscription
        $scope.hasOfficialSubscription = function () {
            return _.findWhere($scope.site.subscriptions, {is_official: true}) ? true : false;
        };

        // edit subscription
        $scope.editSubscription = function ($index) {
            var subscription, 
                parentScope = $scope,
                isNew = true;
            if ($index) {
                subscription = $scope.site.subscriptions[$index];
                isNew = false;
            } else {
                subscription = {
                    type: 'twitter',
                    search_terms: "",
                    has_profanity_filter: $scope.has_profanity_filter,
                    blacklisted_keywords: $scope.blacklisted_keywords.split(","), //@TODO: trim
                    is_official: true
                };
            }
            var dialog = $modal.open({
                backdrop: true,
                keyboard: true,
                templateUrl:  'js/modules/sites/templates/dialog-subscription-edit.html',
                controller: function DialogController($scope, $modalInstance) {
                    $scope.isNew = isNew;
                    $scope.subscription = subscription;
                    $scope.types = [
                        {key: "twitter", label: "Twitter"},
                        {key: "facebook", label: "Facebook"},
                        {key: "instagram", label: "Instagram"},
                        {key: "youtube", label: "Youtube"},
                        {key: "newsblogs", label: "News & Blogs"}
                    ];
                    $scope.ok = function (subscriptionForm) {
                        subscriptionForm.$setDirty();
                        if (subscriptionForm.$valid) {
                            if ($index) {
                                parentScope.site.subscriptions[$index] = $scope.subscription;
                            } else {
                                parentScope.site.subscriptions.push($scope.subscription);
                            }
                            $modalInstance.close();
                        }
                    };
                    $scope.delete = function () {
                        if ($index) {
                            parentScope.site.subscriptions.splice($index, 1); // remove
                        }
                        $modalInstance.close();
                    };
                    $scope.cancel = function () {
                        $modalInstance.close();
                    };
                }
            });
        };
    };

    SiteCtrl.$inject = dependencies;
    SiteCtrl.resolve = {
        user: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }],
        themes: ['$q', function ($q) {
            var deferred = $q.defer();
            deferred.resolve([
                {key: "default", label: "Socialseek"},
                {key: "pinterest", label: "Pinterest Style"}
            ]);
            return deferred.promise;
        }],
        categories: ['$q', function ($q) {
            var deferred = $q.defer();
            deferred.resolve([
                {key: "sports", label: "Sports"},
                {key: "celebrities", label: "Celebrities"},
                {key: "music", label: "Music"},
                {key: "tvshows", label: "TV Shows"},
                {key: "events", label: "Events"},
                {key: "politics", label: "Politics"},
                {key: "technologies", label: "Technologies"},
                {key: "business", label: "Companies / Brands"},
                {key: "nonprofits", label: "Non-Profits"},
                {key: "people", label: "People"},
                {key: "educations", label: "Educations"},
                {key: "movies", label: "Movies"},
                {key: "media", label: "Media"},
                {key: "others", label: "Others"}
            ]);
            return deferred.promise;
        }],
        site: ['$route', '$q', 'siteResource', function ($route, $q, siteResource) {
            var id = $route.current.params.id;
            var deferred = $q.defer();
            if (id === 'new') {
                deferred.resolve(siteResource.defaults);
            } else {
                siteResource.get(id, {}).success(function (payload) {
                    deferred.resolve(payload);
                });
            }

            return deferred.promise;
        }],
    };

    return SiteCtrl;
});

