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

                // initialize model
                var mapModel = {};

                // iniitalize model's zoom
                mapModel = setZoom(mapModel, 15);

                // initialize model's center
                if (navigator.geolocation) {

                    // with geolocation
                    navigator.geolocation.getCurrentPosition(function(position) {
                        mapModel = setCenter(mapModel, new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                        resolve(mapModel);
                    }, function() {

                        // or default center
                        mapModel = setCenter(mapModel, new google.maps.LatLng(42.056459, -87.675267));
                        resolve(mapModel);
                    });
                }

                // default center
                else {
                    setCenter(mapModel, new google.maps.LatLng(42.056459, -87.675267));
                    resolve(mapModel);
                }
            });   
        };



        /***********
         * Setters *
         ***********/
        // Set map model's zoom
        function setZoom(model, zoom) {
            model.zoom = zoom;
            return model;
        };

        // Set map model's center
        function setCenter(model, center) {
            model.center = center;
            return model;
        };

        // Set map model's bounds
        function setBounds(model, bounds) {
            model.bounds = bounds;
            return model;
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