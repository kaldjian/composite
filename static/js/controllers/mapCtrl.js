/***********************
 * Map View Controller *
 ***********************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MapCtrl', ['$scope', '$http', 'MapStateSrv', 'FaceStorageSrv', function ($scope, $http, MapStateSrv, FaceStorageSrv) {


        /***************
         * Google Maps *
         ***************/
        $scope.initializeMap = function() {
            // Create map --> add dragend listener
            var promise = new Promise(function(resolve, reject) {
                var success = false;
                $scope.map = MapStateSrv.getMap('mainMap');

                // If map hasn't been created yet
                if ($scope.map == -1) {
                    // Initialize default map
                    var mapOptions = {
                        center: new google.maps.LatLng(42.056459, -87.675267),
                        zoom: 15,
                        disableDefaultUI: true
                    };
                    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    MapStateSrv.addMap('mainMap');
                    MapStateSrv.updateMap('mainMap', $scope.map.getCenter(), $scope.map.getZoom());
                    var success = true;
                }

                // If a map's already been created
                else {
                    // Retrieve state and initialize
                    var mapOptions = {
                        center: $scope.map.center,
                        zoom: $scope.map.zoom,
                        disableDefaultUI: true
                    };
                    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    var success = true;
                }

                // Promise results
                if (success) {
                    resolve("Stuff worked!");
                }
                else {
                    reject(Error("It broke"));
                }
            });

            // After the map's been created, add dragend listener
            promise.then(function(result) {
                google.maps.event.addListener($scope.map, 'dragend', function() {
                    // Update state
                    MapStateSrv.updateMap('mainMap', $scope.map.getCenter(), $scope.map.getZoom());

                    // Hit instagram endpoint
                    var lat = $scope.map.getCenter().lat();
                    var lng = $scope.map.getCenter().lng();
                    $http.post('/instagram', {"lat": lat, "lng": lng}).
                        success(function(results) {
                            FaceStorageSrv.updateFaces(results)
                        }).
                        error(function(error) {
                            console.log(error);
                        });
                });

            }, function(err) {
                console.log(err);
            });
        };



        /******************
         * UI Interaction *
         ******************/
        $scope.navigateToFaces = function() {
            window.location.href = "/#/faces";
        };



        /***********
         * Styling *
         ***********/



        /***********
         * Helpers *
         ***********/




    }]);