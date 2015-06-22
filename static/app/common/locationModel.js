/******************
 * Location Model *
 ******************/

'use strict';


angular
    .module('compositeApp.common')
    .factory('LocationModel', ['$http', function ($http) {


        // Location model
        this.location = {
            lat: null,
            lng: null,
            radius: null,
            zoom: null
        };


        /**
         * Faces model setter
         */
        this.setLocation = function () {

        };



        /**
         * Calculates the radius in meters of a map
         *
         * @param location {LatLng} - A latitude and longitude representing the center of a map
         * @param zoom {integer} - The zoom value of a map
         * @param constants {object} - Contains the width and height of the peek map
         */
        var getRadius = function(location, zoom, constants) {
            var TILE_SIZE = 256;

            var _pixelOrigin = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
            var _pixelsPerLonDegree = TILE_SIZE / 360;
            var _pixelsPerLonRadian = TILE_SIZE / (2 * Math.PI);

            var degreesToRadians = function(deg) {
                return deg * (Math.PI / 180);
            };

            var radiansToDegrees = function(rad) {
                return rad / (Math.PI / 180);
            };

            var bound = function(val, min, max) {
                var res = Math.max(val, min);
                res = Math.min(res, max);
                return res;
            };

            var toPoint = function(lat, lng, zoom) {
                var x = _pixelOrigin.x + (lng * _pixelsPerLonDegree);

                var siny = bound(Math.sin(degreesToRadians(lat)), -0.9999, 0.9999);
                var y = _pixelOrigin.y + (0.5 * Math.log((1 + siny) / (1 - siny)) * _pixelsPerLonRadian);

                var point = new google.maps.Point(x, y);
                return point;
            };

            var toLatLng = function(point, zoom) {

                var lng = (point.x - _pixelOrigin.x) / _pixelsPerLonDegree;
                var latRadians = (point.y - _pixelOrigin.y) / _pixelsPerLonRadian;
                var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

                return new google.maps.LatLng(lat, lng);
            };

            var clat = location.lat();
            var clng = location.lng();
            var cp = toPoint(clat, clng, zoom);

            var zf = Math.pow(2, zoom) * 2;
            var dw = constants.peekMap.WIDTH / zf;
            var dh = constants.peekMap.HEIGHT / zf;

            var north = toLatLng(new google.maps.Point(cp.x, cp.y + dh), zoom);
            var west = toLatLng(new google.maps.Point(cp.x - dw, cp.y), zoom);

            var dx = google.maps.geometry.spherical.computeDistanceBetween(location, north);
            var dy = google.maps.geometry.spherical.computeDistanceBetween(location, west);

            return Math.min(dx, dy);
        };
    }]);