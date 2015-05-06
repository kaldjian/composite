/***********************
 * Face View Controller *
 ***********************/

'use strict';

var app = angular.module('compositeApp', []);

app.controller('MapCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {



    /***************
     * Google Maps *
     ***************/
    $scope.initializeMap = function() {
        console.log('hi');
        $scope.mapCenter = new google.maps.LatLng(42.056459, -87.675267);

        // Create map
        var mapOptions = {
            center: $scope.mapCenter,
            zoom: 15,
            disableDefaultUI: true
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Listen for "dragend" events
        google.maps.event.addListener(map, 'dragend', function() {
            var lat = map.getCenter().lat();
            var lng = map.getCenter().lng();

            $http.post('/instagram', {"lat": lat, "lng": lng}).
                success(function(results) {
                    $rootScope.faces = results;
                    console.log($rootScope.faces);
                }).
                error(function(error) {
                    console.log(error);
                });
        });
    };



    /******************
     * UI Interaction *
     ******************/
    $scope.navigateToFaces = function() {
        window.location.href = "/faces";
    };



    /***********
     * Styling *
     ***********/



    /***********
     * Helpers *
     ***********/




}]);