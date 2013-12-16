define([], function () {
    "use strict";

    var dependencies = ['$scope', '$location', '$rootScope'];
    var MessageCtrl = function ($scope, $location, $rootScope) {
        $scope.messages = [];
        $scope.$on('success', function(event, msg){
            $scope.messages.push({class: 'alert-success', msg: msg});
        });
        $scope.$on('notify', function(event, msg){
            $scope.messages.push({class: 'alert-info', msg: msg});
        });
        $scope.$on('warning', function(event, msg){
            $scope.messages.push({class: 'alert-warning', msg: msg});
        });
        $scope.$on('error', function(event, msg){
            $scope.messages.push({class: 'alert-danger', msg: msg});
        });

        $scope.close = function ($index) {
            $scope.messages.splice($index, 1);
        };
    };
    
    MessageCtrl.$inject = dependencies;

    return MessageCtrl;
});
