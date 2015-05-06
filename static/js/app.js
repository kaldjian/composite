/********************
 * Declaring Module *
 ********************/

'use strict';

var app = angular.module('compositeApp', [
    'ngRoute',
]);

// To make it compatible with Jinja
app.config(['$interpolateProvider', '$routeProvider',
    function($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');

        $routeProvider.
            when('/map', {
                templateUrl: '../static/partials/map.html',
                controller: 'MapCtrl',
            }).
            when('/faces', {
                templateUrl: '../static/partials/faces.html',
                controller: 'FacesCtrl',
            }).
            otherwise({
                redirectTo: '/map'
            });

    }]);
