define(['angular', 'jquery', 'moment'], function (angular, $, moment) {
    "use strict";

    var common = angular.module('filters.common', []);

    common.filter("capitalize", function () {
        return function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
    });

    common.filter("ellipsis", function () {
        return function (string) {
            if (string) {
                return string.length > 50 ? string.substr(0, 50) + '...' : string;
            } else {
                return "";
            }
        };
    });

    return common;
});
