define([], function () {
    "use strict";

    var dependencies = [];
    var LogoutCtrl = function () {
    };
    
    LogoutCtrl.$inject = dependencies;
    LogoutCtrl.resolve = {
        logout: function ($location, securityService) {
            securityService.destroySession();
            $location.path('/login');
        }
    };
    return LogoutCtrl;
});

