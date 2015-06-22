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
                $http.post('/instagram', {"lat":  constraintsModel.location.lat(),
                                          "lng":  constraintsModel.location.lng(),
                                          "dist": constraintsModel.distance})
                    .success(function(results) {
                        //console.log("RESULTS: ", results)
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