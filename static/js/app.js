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
        $routeProvider
            .when('/map', {
                templateUrl: '../static/partials/map.html',
                controller: 'MapCtrl'
            })
            .when('/faces', {
                templateUrl: '../static/partials/faces.html',
                controller: 'FacesCtrl'
            })
            .otherwise({
                redirectTo: '/faces'
            });
    }]);
