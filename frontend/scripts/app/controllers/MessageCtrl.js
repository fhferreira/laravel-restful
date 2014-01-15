define([], function () {
    "use strict";

    var DELAY = 2000;

    var dependencies = ['$scope', '$location', '$rootScope', 'uniqueIdService'];
    var MessageCtrl = function ($scope, $location, $rootScope, uniqueIdService) {
        $scope.messages = {};
        $scope.$on('success', function(event, msg) {
            var id = uniqueIdService.generate();
            $scope.messages[id] = {class: 'alert-success', msg: msg};
            setTimeout(function () {
                $scope.close(id);
            }, DELAY);
        });
        $scope.$on('notify', function(event, msg) {
            var id = uniqueIdService.generate();
            $scope.messages[id] = {class: 'alert-info', msg: msg};
            setTimeout(function () {
                $scope.close(id);
            }, DELAY);
        });
        $scope.$on('warning', function(event, msg) {
            var id = uniqueIdService.generate();
            $scope.messages[id] = {class: 'alert-warning', msg: msg};
            setTimeout(function () {
                $scope.close(id);
            }, DELAY);
        });
        $scope.$on('error', function(event, msg) {
            var id = uniqueIdService.generate();
            $scope.messages[id] = {class: 'alert-danger', msg: msg};
            setTimeout(function () {
                $scope.close(id);
            }, DELAY);
        });

        $scope.close = function (id) {
            if ($scope.messages.hasOwnProperty(id)) {
                delete $scope.messages[id];
                $scope.$apply(); // force refresh
            }
        };
    };
    
    MessageCtrl.$inject = dependencies;

    return MessageCtrl;
});
