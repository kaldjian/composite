/***********************
 * Map View Controller *
 ***********************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MapCtrl', ['$scope', 'FacesModelSrv', 'MapModelSrv', 'ConstraintsModelSrv', function ($scope, FacesModelSrv, MapModelSrv, ConstraintsModelSrv) {


        /*******************
         * Data Management *
         *******************/

        // Switch active view
        $scope.siteStateModel.activeView = 'map';

        // Initialize map
        $scope.initializeMap = function() {

            // Set map options
            var mapOptions = {
                center: $scope.mapModel.center,
                disableDefaultUI: true,
                styles: [
                    {
                        "stylers": [ 
                            {
                                "visibility": "on"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "gamma": 0.54
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "stylers": [
                            {
                                "color": "#373737"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill", 
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "gamma": 0.48
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "gamma": 7.18
                            }
                        ]
                    }
                ],
                zoom: $scope.mapModel.zoom,
            };

            // map model not completely initialized immediately, need to wait until it is
            var checkforMapModel = window.setInterval(function() {
                if (typeof $scope.mapModel.center != 'undefined') {

                    // update map options
                    mapOptions.center = $scope.mapModel.center;
                    mapOptions.zoom = $scope.mapModel.zoom - 1;

                    // create map instance
                    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                    // Initialize map model bounds without having to drag
                    google.maps.event.addListener(map, 'tilesloaded', function() {
                        $scope.mapModel = MapModelSrv.setBounds($scope.mapModel, map.getBounds());
                        $scope.$apply();
                    });

                    // Establish dragend listener
                    google.maps.event.addListener(map, 'dragend', function() {

                        // Update map model
                        $scope.mapModel = MapModelSrv.setZoom($scope.mapModel, map.getZoom());
                        $scope.mapModel = MapModelSrv.setCenter($scope.mapModel, map.getCenter());
                        $scope.mapModel = MapModelSrv.setBounds($scope.mapModel, map.getBounds());
                        $scope.$apply();

                        // Update constraints model
                        ConstraintsModelSrv.update($scope.mapModel, $scope.constraintsModel.date).then(function(response) {
                            $scope.constraintsModel = response;

                            // Update faces model
                            FacesModelSrv.update($scope.constraintsModel).then(function(response) {
                                $scope.facesModel.faces = response;
                                $scope.$apply();

                            // Display any errors
                            }, function(error) { console.log(error); });
                        }, function(error) { console.log(error); });
                    });

                    // stop checking for map model
                    clearInterval(checkforMapModel);
                }
            }, 100);
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