/************************
 * Peek View Controller *
 ************************/

'use strict';


angular
    .module('compositeApp.peek')
    .controller('PeekCtrl',
    	       ['$scope', 'FacesModel', 'LocationModel'
    	       function ($scope, FacesModel, LocationModel) {


    /*******************
     * Data Management *
     *******************/

    $scope.initialize = function() {

        // create map options
        var mapOptions = {
            center: $rootScope.models.location,
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
            zoom: $rootScope.models.zoom - 1,
        };

        // map model not completely initialized immediately, need to wait until it is
        var checkforMapModel = window.setInterval(function() {
            if (typeof $rootScope.models.location != 'undefined') {

                // update map options
                mapOptions.center = $rootScope.models.location;
                mapOptions.zoom = $rootScope.models.zoom;

                // create map instance
                var peekMap = new google.maps.Map(document.getElementById('peek-map'), mapOptions);

                // update the map whenever the map model's updated
                $rootScope.$watch('models.location', function() {
                    peekMap.setCenter($rootScope.models.location);
                    peekMap.setZoom($rootScope.models.zoom - 1);
                });

                // when showing map peek on faces view, trigger resize event
                $rootScope.$watch('models.activeView', function() {

                    if ($rootScope.models.activeView == 'faces') {
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
        switch ($rootScope.models.activeView) {
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