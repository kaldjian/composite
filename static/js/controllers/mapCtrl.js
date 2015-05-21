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

            // Declare map variable
            var map;

            // Every time the map model changes, update the view and models
            $scope.$watch('mapModel', function() {

                // Set map options
                var mapOptions = {
                    center: $scope.mapModel.center,
                    disableDefaultUI: true,
                    zoom: $scope.mapModel.zoom,
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
                    ]
                };

                // Create map instance
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                // Initialize map model bounds without having to drag
                google.maps.event.addListener(map, 'tilesloaded', function() {
                    $scope.mapModel = MapModelSrv.setBounds($scope.mapModel, map.getBounds());
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
                            // $scope.$apply();

                        // Display any errors
                        }, function(error) { console.log(error); });
                    }, function(error) { console.log(error); });  
                });
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