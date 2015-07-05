'use strict';


angular
    .module('compositeApp.common')
    .service('FacesModel',
    	     ['$http',
    	     function ($http) {

    
    /**
     * Private variables, setters
     *
     */
    var faces = [];



    /**
     * Sets this.faces array with results of hitting backend's
     * /instagram endpoint using location and date models
     *
     */
    this.setFaces = function (lat, lng, radius, minTimestamp) {
        $http.post('/instagram', {"lat": lat,
                                  "lng": lng,
                                  "dist": radius,
                                  "min_timestamp": minTimestamp})
            .success(function (results) {
                faces = results;
                console.log(faces);
            })
            .error(function (error) {
                console.log('Error setting faces');
            });
    };



}]);