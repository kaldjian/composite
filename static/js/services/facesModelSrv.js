/***********************
 * Faces Model Service *
 ***********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('FacesModelSrv', ['$http', 'BlockingSrv', function ($http, BlockingSrv) {



        // Update faces model
        function update(constraintsModel, siteStateModel) {
            return new Promise(function(resolve, reject) {

                // Ensure other requests aren't currently being made
                var checkForBlocks = window.setInterval(function() {

                    // Check scope
                    if (!BlockingSrv.isBlocking()) {

                        // Stop checking
                        clearInterval(checkForBlocks);

                        // Request is now in progress, blocking
                        BlockingSrv.startBlocking();

                        // Get unix timestamp for model date and now
                        var modelUnix = constraintsModel.date.getTime() / 1000;
                        var now = new Date().getTime() / 1000;
                        var min_timestamp;

                        // Set min_timestamp to always have a five day range
                        if (now - modelUnix < 432000) {
                            min_timestamp = now - 432000;
                        }
                        else {
                            min_timestamp = modelUnix;
                        }

                        // Hit backend to make instagram query
                        $http.post('/instagram', {"lat":  constraintsModel.location.lat(),
                                                  "lng":  constraintsModel.location.lng(),
                                                  "dist": constraintsModel.distance,
                                                  "min_timestamp": min_timestamp})
                            .success(function(results) {
                                BlockingSrv.stopBlocking();
                                resolve(results);
                            })
                            .error(function(error) {
                                BlockingSrv.stopBlocking();
                                reject(error);
                            });
                    }

                    else {
                        console.log('Request in progress!');
                    }
                }, 50);
            });
        };



        // Returns handles to the service's functions
        return {
            update: update,
        };

    }]);