/***********************
 * Faces Model Service *
 ***********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('FacesModelSrv', ['$http', function ($http) {



        // Update faces model
        function update(constraintsModel) {
            return new Promise(function(resolve, reject) {

                // Get unix timestamp for model date and now
                var modelUnix = constraintsModel.date.getTime() / 1000;
                var now = new Date().getTime() / 1000;
                var min_timestamp;


                if (now - modelUnix < 432000) {
                    min_timestamp = now - 432000;
                }
                else {
                    min_timestamp = modelUnix;
                }

                console.log(now);
                console.log(min_timestamp);
                $http.post('/instagram', {"lat":  constraintsModel.location.lat(),
                                          "lng":  constraintsModel.location.lng(),
                                          "dist": constraintsModel.distance,
                                          "min_timestamp": min_timestamp})
                    .success(function(results) {
                        resolve(results);
                    })
                    .error(function(error) {
                        reject(error);
                    });
            });
        };



        // Returns handles to the service's functions
        return {
            update: update,
        };

    }]);