/********************************
 * Manipulate Map Model Service *
 ********************************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('ManipulateMapModel', [function () {



        // Initialize map model using geolocation or default coordinates
        function initialize(facesModel) {
            return new Promise(function(resolve, reject) {
                var mapModel = {
                    zoom: 15,
                };
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        mapModel.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        resolve(mapModel);
                    }, function() {
                        mapModel.center = new google.maps.LatLng(42.056459, -87.675267);
                        resolve(mapModel);
                    });
                }
                else {
                    mapModel.center = new google.maps.LatLng(42.056459, -87.675267);
                    resolve(mapModel);
                }
            });
        };



        // Returns handles to the service's functions
        return {
            initialize: initialize,
        };

    }]);