define(['angular'], function (angular) {
    "use strict";

    var userResource = angular.module('resources.user', []);

    userResource.factory('userResource', ['$http', function ($http) {
        var priv = {
            baseUrl: "/api/users/"
        };

        var exports = {
            defaults: {
                //"id": 
                "username": "",
                "email": "",
                "password": "",
                "group":  "member",
                "status":  "pending",
                "meta": {
                    "first_name": "", 
                    "last_name": "",
                    "company": "",
                    "phone": "",
                    "website_url": "",
                    "address": "",
                    "city": "",
                    "province": "", 
                    "postal": "",
                    "country": ""
                },
                "billing": {
                    "credit_card_name": "",
                    "credit_card_num": "",
                    "credit_card_type": "",
                    "credit_card_expiry_month": "",
                    "credit_card_expiry_year": "",
                    "credit_card_ccv": "",
                    "same_as_profile": "",
                    "address": "",
                    "city": "",
                    "province": "",
                    "postal": "",
                    "country": ""
                },
                "twitter_oauth_token": {
                    "request_token": "",
                    "access_token": "",
                    "updated_at": "",
                    "created_at": "",
                    "expired_at": ""
                },
                "facebook_oauth_token": {
                    "AccessToken": "",
                    "RefreshToken": "",
                    "Expiry": "",
                    "Extra": ""
                }, 
                "instagram_oauth_token": {
                    "AccessToken": "",
                    "RefreshToken": "",
                    "Expiry": "",
                    "Extra": ""
                } 
                //"updated_at":  
                //"created_at": 
            },
            find: function (params) {
                return $http.get(priv.baseUrl, params);
            },
            create: function (params) {
                return $http.post(priv.baseUrl, params);
            },
            getMe: function () {
                return $http.get(priv.baseUrl + "me");
            },
            get: function (id, params) {
                return $http.get(priv.baseUrl + id, params);
            },
            updateMe: function (params) {
                return $http.put(priv.baseUrl + "me", params);
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

    return userResource;
});
