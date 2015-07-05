/*************************
 * Declaring Main Module *
 *************************/

'use strict';

var app = angular.module('compositeApp', [
    'ngRoute',
    'compositeApp.common',
    'compositeApp.header',
    // 'compositeApp.peek',
    // 'compositeApp.map',
    // 'compositeApp.faces',
]);


app.config(['$interpolateProvider', '$routeProvider',
    function($interpolateProvider, $routeProvider) {

        // To make Angular + Jinja work
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');


        // Router
        $routeProvider
            .when('/map', {
                templateUrl: '../static/app/map/map.html',
                controller: 'MapCtrl'
            })
            .when('/faces', {
                templateUrl: '../static/app/faces//faces.html',
                controller: 'FacesCtrl'
            })
            .otherwise({
                redirectTo: '/faces'
            });
    }]);
