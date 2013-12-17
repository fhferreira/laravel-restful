define(['angular', 'resources/user/user'], function (angular, user) {
    "use strict";

    var security = angular.module('services.security', [user.name]);
    
    security.factory('securityService', ['userResource', '$http', '$cookieStore', '$q', '$rootScope', 'SESSION_COOKIE_NAME', function (userResource, $http, $cookieStore, $q, $rootScope, SESSION_COOKIE_NAME) {
        var priv = {
            // session object
            session: null,
            // session object
            currentUser: null,
            requestSent: false,
            deferred: new $q.defer()
        };

        var exports = {
            init: function (session) {
                priv.requestSent = false;
                // if no session, try to get from cookie
                if (!session) {
                    if ($cookieStore.get(SESSION_COOKIE_NAME)) {
                        session = angular.fromJson($cookieStore.get(SESSION_COOKIE_NAME)) || null;
                    }
                } else {
                    $cookieStore.put(SESSION_COOKIE_NAME, angular.toJson(session));
                }
                
                priv.session = session;
                // set authorization token
                if (priv.session && priv.session.id) {
                    $http.defaults.headers.common['Authorization'] = priv.session.id;
                }

                this.requestCurrentUser();
            },
            isAuthenticated: function () {
                return !!priv.session && !!priv.currentUser;
            },
            getSession: function () {
                return priv.session;
            },
            requestCurrentUser: function () {
                if (!priv.requestSent) {
                    priv.requestSent = true;
                    userResource.getMe().success(function(payload) {
                        priv.currentUser = payload; 
                        $rootScope.$broadcast('authChange');
                        priv.deferred.resolve(payload);
                    });
                }
                return priv.deferred.promise;
            },
            setUser: function (user) {
                priv.currentUser = user;
                priv.deferred = new $q.defer();
                priv.deferred.resolve(user);
            },
            destroySession: function () {
                priv.session = null;
                priv.currentUser = null;
                priv.requestSent = false;
                priv.deferred = new $q.defer();

                $cookieStore.remove(SESSION_COOKIE_NAME);
                $http.defaults.headers.common['Authorization'] = "";
                $rootScope.$broadcast('authChange');
            }
            /*isExpired: function () {
                if (moment(this.data.expired_at).diff(moment()) < 0) {
                    console.log('Session expired at: ', this.data.expired_at);
                    this.data = null;
                    $cookieStore.remove('session');
                    return true;
                }
                return false;
            },
            isValid: function () {
                if (this.session !== null) {
                    //if (!this.isExpired()) {
                    return true;
                    //}
                }
                return false;
            }*/
        };
        return exports; 
    }]);

    return security;
});

