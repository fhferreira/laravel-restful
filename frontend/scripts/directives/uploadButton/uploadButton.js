define(['angular', 'jquery', 'moment'], function (angular, $, moment) {
    "use strict";

    var common = angular.module('directives.uploadButton', []);

    common.directive("uploadButton", function ($http, $templateCache, $compile) {
        return {
            link: function (scope, element, attributes) {
                // set element visibility
                if (!element.attr('id')) {
                    console.log('uploadButton: unable to build button. id not found in element.');
                } else {
                    element.css({
                        'position': 'fixed',
                        'left': '-9999px'
                    });
                    var $button = $('<button></button>')
                        .html(attributes.uploadButtonText || 'Upload')
                        .addClass(attributes.uploadButtonClass || '')
                        .on('click', function (e) {
                            e.preventDefault();
                            element.trigger('click');
                        });

                    element.on('click', function (e) {
                        // stop event bubbling
                        e.stopPropagation();
                    });

                    element.wrap($button);
                }
            }
        };
    });

    return common;
});
