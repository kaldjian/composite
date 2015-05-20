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
                var dx = mapModel.center.lat() - mapModel.bounds.getSouthWest().lat();
                var dy = mapModel.center.lng() - mapModel.bounds.getSouthWest().lng();
                var dmin = Math.min(dx, dy);
                var constraintsModel = {
                    location: mapModel.center,
                    distance: dmin,
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