/***********************
 * Map View Controller *
 ***********************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MapCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {


        /*******************
         * Data Management *
         *******************/

        // Switch active view
        $rootScope.models.activeView = 'map';

        // Initialize map
        $scope.initializeMap = function() {

            // Set map options
            var mapOptions = {
                center: $rootScope.models.location,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
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
                zoom: $rootScope.models.zoom,
            };

            // Wait until models are initialized
            var checkforMapModel = window.setInterval(function() {
                if (typeof $rootScope.models.location != 'undefined') {

                    // stop checking for map model
                    clearInterval(checkforMapModel);

                    // update map options
                    mapOptions.center = $rootScope.models.location;
                    mapOptions.zoom = $rootScope.models.zoom;

                    // create map instance
                    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                    // Establish dragend listener
                    google.maps.event.addListener(map, 'dragend', function() {

                        $rootScope.$apply(function() {
                            $rootScope.models.location = map.getCenter();   
                        });
                    });

                    // Establish zoom_changed listener
                    google.maps.event.addListener(map, 'zoom_changed', function() {

                        $rootScope.$apply(function() {
                            $rootScope.models.zoom = map.getZoom();
                        });
                    });

                    // update the map whenever the map model's updated
                    $rootScope.$watch('models.location', function() {
                        map.setCenter($rootScope.models.location);
                    });
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