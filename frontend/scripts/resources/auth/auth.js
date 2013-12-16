define(['angular'], function (angular) {
    "use strict";

    var authResource = angular.module('resources.auth', []);

    authResource.factory('authResource', ['$http', function ($http) {
        var priv = {
            baseUrl: "/api/auth/"
        };

        var exports = {
            oauth: function (params) {
                return $http.get(priv.baseUrl + "oauth/authenticate?", {
                    params: params
                });
            },
            oauth2: function (params) {
                return $http.get(priv.baseUrl + "oauth2/authenticate?", {
                    params: params
                });
            },
            login: function (params) {
                return $http.post(priv.baseUrl + "login", params);
            },
            logout: function () {
                return $http.post(priv.baseUrl + "logout");
            }
        };

        return exports; 
    }]);

    return authResource;
});
