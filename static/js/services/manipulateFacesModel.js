/**********************************
 * Manipulate Faces Model Service *
 *********************************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('ManipulateFacesModel', ['$http', function ($http) {



        // Update faces model
        function update(mapModel) {
            return new Promise(function(resolve, reject) {
                var facesModel = {
                    faces: {},
                }
                $http.post('/instagram', {"lat": mapModel.center.lat(),
                                          "lng": mapModel.center.lng()})
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