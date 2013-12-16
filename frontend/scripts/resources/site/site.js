define(['angular'], function (angular) {
    "use strict";

    var siteResource = angular.module('resources.site', []);

    siteResource.factory('siteResource', ['$http', function ($http) {
        var priv = {
            baseUrl: "/api/sites/"
        };

        var exports = {
            defaults: {
                //id: "", 
                //user_id: "", 
                name: "",
                logo_url: "", 
                category: "",
                official_only: false,
                subscriptions: [{
                    //id: "",
                    type: 'facebook',
                    search_terms: '',
                    has_profanity_filter: false,
                    blacklisted_keywords: [],
                    is_official: false
                },{
                    //id: "",
                    type: 'twitter',
                    search_terms: '',
                    has_profanity_filter: false,
                    blacklisted_keywords: [],
                    is_official: false
                },{
                    //id: "",
                    type: 'instagram',
                    search_terms: '',
                    has_profanity_filter: false,
                    blacklisted_keywords: [],
                    is_official: false
                },{
                    //id: "",
                    type: 'newsblogs',
                    search_terms: '',
                    has_profanity_filter: false,
                    blacklisted_keywords: [],
                    is_official: false
                }],
                tags: [],
                theme: "default"
                //created_at: "",
                //updated_at: "2013-10-17T15:44:20.095-04:00"
            },
            find: function (params) {
                return $http.get(priv.baseUrl, params);
            },
            create: function (params) {
                return $http.post(priv.baseUrl, params);
            },
            get: function (id, params) {
                return $http.get(priv.baseUrl + id, params);
            },
            update: function (id, params) {
                return $http.put(priv.baseUrl + id, params);
            },
            delete: function (id) {
                return $http.delete(priv.baseUrl + id);
            }
        };

        return exports; 
    }]);

    return siteResource;
});
