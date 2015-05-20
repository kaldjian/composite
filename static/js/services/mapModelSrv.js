/**********************
 *  Map Model Service *
 **********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('MapModelSrv', [function () {



        /***********
         * Helpers *
         ***********/
        // Initialize the model
        function initialize() {
            return new Promise(function(resolve, reject) {

                // iniitalize zoom
                setZoom(15);

                // initialize center
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    }, function() {
                        setCenter(new google.maps.LatLng(42.056459, -87.675267));
                    });
                    resolve('initialized map model');
                }
                else {
                    setCenter(new google.maps.LatLng(42.056459, -87.675267));
                    resolve('initialized map model');
                }
            }   
        };



        /***********
         * Setters *
         ***********/
        // Set map model's zoom
        function setZoom(zoom) {
            return new Promise(function(resolve, reject) {
                $scope.mapModel.zoom = zoom;
            });
        };

        // Set map model's center
        function setCenter(center) {
            return new Promise(function(resolve, reject) {
                $scope.mapModel.center = center;
            });
        };

        // Set map model's bounds
        function setBounds(bounds) {
            return new Promise(function(resolve, reject) {
                $scope.mapModel.bounds = bounds;
                console.log($scope.mapModel.bounds);
            });
        };



        /*******************
         * Service handles *
         *******************/
        return {
            initialize: initialize,
            setZoom: setZoom,
            setCenter: setCenter,
            setBounds: setBounds
        };

    }]);