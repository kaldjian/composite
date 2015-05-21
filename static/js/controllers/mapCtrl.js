/***********************
 * Map View Controller *
 ***********************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MapCtrl', ['$scope', 'FacesModelSrv', 'MapModelSrv', function ($scope, FacesModelSrv, MapModelSrv) {


        /*******************
         * Data Management *
         *******************/

        // Initialize map
        $scope.initializeMap = function() {

            var map;

            $scope.$watch('mapModel', function() {
                var mapOptions = {
                    center: $scope.mapModel.center,
                    disableDefaultUI: true,
                    zoom: $scope.mapModel.zoom,
                };
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                // MapModelSrv.setBounds(map.getBounds());

                google.maps.event.addListener(map, 'dragend', function() {
                    // Update state
                    $scope.mapModel.center = map.getCenter();
                    $scope.mapModel.zoom = map.getZoom();

                    // Update faces
                    ManipulateFacesModel.update($scope.mapModel).then(function(response) {
                        $scope.facesModel.faces = response;
                        $scope.$apply();
                    }, function(error) {
                        console.log(error);
                    });
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