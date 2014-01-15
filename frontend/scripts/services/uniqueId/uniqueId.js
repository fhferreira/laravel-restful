define(['angular', 'resources/user/user'], function (angular) {
    "use strict";

    var uniqueId = angular.module('services.uniqueId', []);
    
    uniqueId.factory('uniqueIdService', [function () {
        var priv = {
            maxTries: 5,
            defaultLen: 5,
            history: {},
            generate: function (len) {
                var id = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for(var i = 0; i < len; i++) {
                    id += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                return id;
            }
        };

        var exports = {
            generate: function (len) {
                if (!len) {
                    len = priv.defaultLen;
                }
                var id, tries = 0;
                do {
                    id = priv.generate(len);
                    tries++;
                } while (priv.history.hasOwnProperty(id) && tries < priv.maxTries); 
                
                if (tries > priv.maxTries) {
                    throw new Error('uniqueIdService unable generate a unique ID.');
                }

                priv.history[id] = true;

                return id;
            }
        };
        return exports; 
    }]);

    return uniqueId;
});

