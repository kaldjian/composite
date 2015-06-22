/******************************
 * Model Manipulation Service *
 ******************************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('ModelsSrv', ['$http', 'BlockingSrv', function ($http, BlockingSrv) {


        /**
         * Initializes date, location, zoom peekMap dimensions, and
         * faces
         *
         * @param models {object} - the site's models
         * @param constants {object} - the site's constant values
         */
        function initialize(models, constants) {
            return new Promise(function(resolve, reject) {

                models.date = new Date();
                models.zoom = 15;
                geolocate().then(function(response) {

                    models.location = response;

                    getFaces(models.location,
                             models.zoom,
                             models.date,
                             constants).then(function(response) {

                        models.faces = response;
                        resolve(models);
                    }, function(error) { console.log(error) });

                }, function(error) { console.log(error) });
            });
        };


        /**
         * Returns geolocation or a default location if that fails
         *   Default = LatLng(42.056459, -87.675267) = Evanston's coordinates
         */
        var geolocate = function() {
            return new Promise(function(resolve, reject) {

                // Check if geolocation is available
                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(function(position) {

                        // If it works, return geolocation
                        resolve(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    }, function() {

                        // Otherwise return default location
                        resolve(new google.maps.LatLng(42.056459, -87.675267));
                    });
                }

                // If not available, return default location
                else {
                    resolve(new google.maps.LatLng(42.056459, -87.675267));
                }
            });
        };


        /**
         * Queries backend for faces after doing some calculations on
         * the parameters
         *
         * @param location {LatLng} - A latitude and longitude representing the center of a map
         * @param zoom {integer} - The zoom value of a map
         * @param constants {object} - Contains the width and height of the peek map
         */
        var getFaces = function(location, zoom, date, constants) {
            return new Promise(function(resolve, reject) {

                // Check for other requests every 50ms until no blocks are present
                var checkForBlocks = window.setInterval(function() {
                    if (!BlockingSrv.isBlocking()) {

                        // Stop checking, start blocking
                        clearInterval(checkForBlocks);
                        BlockingSrv.startBlocking();

                        // Get unix timestamp for model date and now
                        var modelUnix = date.getTime() / 1000;
                        var now = new Date().getTime() / 1000;
                        var min_timestamp;

                        // Set min_timestamp to always have a five day range
                        if (now - modelUnix < 432000) {
                            min_timestamp = now - 432000;
                        }
                        else {
                            min_timestamp = modelUnix;
                        }

                        // Get radius
                        var radius = getRadius(location, zoom-1, constants);

                        // Hit backend to make instagram query
                        $http.post('/instagram', {"lat":  location.lat(),
                                                  "lng":  location.lng(),
                                                  "dist": radius,
                                                  "min_timestamp": min_timestamp})
                            .success(function(results) {
                                BlockingSrv.stopBlocking();
                                resolve(results);
                            })
                            .error(function(error) {
                                BlockingSrv.stopBlocking();
                                reject(error);
                            });
                    }
                }, 50);
            });
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




        // Returns handles to the service's functions
        return {
            initialize: initialize,
            getFaces: getFaces,
        };

    }]);