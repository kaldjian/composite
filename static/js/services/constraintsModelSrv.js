/*****************************
 * Constraints Model Service *
 *****************************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('ConstraintsModelSrv', [function () {



        // Update constraints model
        function update(mapModel, newDate) {
            return new Promise(function(resolve, reject) {

                // Create LatLng for [-1, 0] and [0, -1] of the bounds quadrant
                var leftCenter = new google.maps.LatLng(mapModel.bounds.getSouthWest().lat(), mapModel.center.lng());
                var centerBottom = new google.maps.LatLng(mapModel.center.lat(), mapModel.bounds.getSouthWest().lng());

                // Calculate dx and dy
                var dx = google.maps.geometry.spherical.computeDistanceBetween(mapModel.center, leftCenter);
                var dy = google.maps.geometry.spherical.computeDistanceBetween(mapModel.center, centerBottom);

                // Use whichever d that's smaller
                var d = Math.min(dx, dy);

                // Update constraints  odel
                var constraintsModel = {
                    location: mapModel.center,
                    distance: d,
                    date: newDate
                };
                resolve(constraintsModel);
            });
        };



        // Returns handles to the service's functions
        return {
            update: update,
        };

    }]);