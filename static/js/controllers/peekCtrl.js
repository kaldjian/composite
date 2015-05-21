/************************
 * Peek View Controller *
 ************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('PeekCtrl', ['$scope', 'MapModelSrv', function ($scope, MapModelSrv) {


    /*******************
     * Data Management *
     *******************/

    $scope.initialize = function() {

        // create map options
        var mapOptions = {
            center: $scope.mapModel.center,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            draggable: false,
            scrollwheel: false,
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
            zoom: $scope.mapModel.zoom - 1,
        };

        var checkforMapModel = window.setInterval(function() {
            if (typeof $scope.mapModel.center != 'undefined') {

                // update map options
                mapOptions.center = $scope.mapModel.center;
                mapOptions.zoom = $scope.mapModel.zoom - 1;

                // create map instance
                var peekMap = new google.maps.Map(document.getElementById('peek-map'), mapOptions);

                // when it's loaded, update the mapModel's bounds (relevant when /faces is visited first)
                google.maps.event.addListener(peekMap, 'tilesloaded', function() {
                    $scope.mapModel = MapModelSrv.setBounds($scope.mapModel, peekMap.getBounds());
                    $scope.$apply();
                });

                // update the map whenever the map model's updated
                $scope.$watch('mapModel', function() {
                    peekMap.setCenter($scope.mapModel.center);
                    peekMap.setZoom($scope.mapModel.zoom - 1);
                }, true);

                // when showing map peek on faces view, trigger resize event
                $scope.$watch('siteStateModel.activeView', function() {

                    if ($scope.siteStateModel.activeView == 'faces') {
                        setTimeout(function() {
                            google.maps.event.trigger(peekMap, 'resize');
                        }, 100);
                    }
                }, true);

                // stop checking for map model
                clearInterval(checkforMapModel);
            }
        }, 100);
    };






    /******************
     * UI Interaction *
     ******************/

    // Toggle active view on peek box click
    $scope.toggleActiveView = function() {
        switch ($scope.siteStateModel.activeView) {
            case 'faces':
                window.location.href = "/#/map";
                break;
            case 'map':
                window.location.href = "/#/faces";
                break;
        }
    };




    /***********
     * Styling *
     ***********/

    // Crop images into squares
    $scope.cropFaces = function() {
        $('ul.faces-peek li').each(function() {
            var width = $(this).children('img').width();
            $(this).height(width);
        });
    };


}]);