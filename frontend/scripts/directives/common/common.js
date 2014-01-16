define(['angular', 'jquery', 'moment'], function (angular, $, moment) {
    "use strict";

    var common = angular.module('directives.common', []);

    common.directive("include", function ($http, $templateCache, $compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var templateUrl = scope.$eval(attributes.include);
                $http.get(templateUrl, {cache: $templateCache}).success(
                    function (tplContent) {
                        element.replaceWith($compile(tplContent)(scope));
                    }
                );
            }
        };
    });

    common.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    common.directive('date', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (viewValue instanceof Date) {
                        return viewValue;
                    } else {
                        var m = moment(viewValue, "YYYY-MM-DD");
                        if (m && m.isValid()) {
                            // it is valid
                            ctrl.$setValidity('date', true);
                            return viewValue;
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('date', false);
                            return undefined;
                        }
                    }
                });
            }
        };
    });

    return common;
});
