/*************************
 * Declaring Main Module *
 *************************/

'use strict';

var app = angular.module('compositeApp', [
    'ngRoute',
    'compositeApp.controllers',
]);


app.config(['$interpolateProvider', '$routeProvider',
    function($interpolateProvider, $routeProvider) {

        // To make Angular + Jinja work
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');


        // Router
        $routeProvider.
            when('/map', {
                templateUrl: '../static/partials/map.html',
                // controller: 'AboutCtrl'
            }).
            when('/faces', {
                templateUrl: '../static/partials/faces.html',
                controller: 'LoginController'
            }).
            otherwise({
                redirectTo: '/map'
            });
    }]);
