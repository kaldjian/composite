/********************
 * Declaring Module *
 ********************/

var app = angular.module('compositeApp', []);

// To make it compatible with Jinja
app.config(['$interpolateProvider', function($interpolateProvider) {
  	$interpolateProvider.startSymbol('{[');
  	$interpolateProvider.endSymbol(']}');
}]);
