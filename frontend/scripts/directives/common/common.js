define(['angular', 'jquery', 'moment'], function (angular, $, moment) {
    "use strict";

    var common = angular.module('directives.common', []);

    common.directive('imgOnLoad', function () {       
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {   
                element.bind("load" , function(e){ 
                    element.addClass('loaded');
                });
            }
        };
    });

    common.directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.on(attr.stopEvent, function (e) {
                    e.stopPropagation();
                });
            }
        };
    });

    common.directive('parseInt', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, controller) {
                controller.$formatters.push(function (modelValue) {
                    return '' + modelValue;
                });

                controller.$parsers.push(function (viewValue) {
                    return parseInt(viewValue,10);
                });
            }
        };
    }]);

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
