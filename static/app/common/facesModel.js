/***************
 * Faces Model *
 ***************/

'use strict';


angular
    .module('compositeApp.common')
    .factory('FacesModel', ['$http', function ($http) {


        // Faces model
        this.faces = [];


        /**
         * Sets this.faces array with results of hitting backend's
         * /instagram endpoint
         *
         * @param lat {Number} - Center latitude coordinates
         * @param lng {Number} - Center longitude coordinates
         * @param radius {Number} - Radius from center coordinates
         * @param date {Date} - Minimum date with which to query instagram
         */
        this.setFaces = function (lat, lng, radius, date) {
            $http.post('/instagram', {"lat": lat,
                                      "lng": lng,
                                      "dist": radius,
                                      "min_timestamp": calculateMinTimestamp(date)})
	            .success(function (results) {
	                this.faces = results;
	            })
	            .error(function (error) {
	                console.log('Error setting faces');
	            });
        };




        /***********
         * Helpers *
         ***********/

        /**
         * Calculates a minimum timestamp for instagram request, always
         * ensure a range of 5 days (432000 seconds)
         *
         * @param requestedDate {Date} - Date requested by user
         */
        var calculateMinTimestamp = function (requestedDate) {
        	var requestedUnix = requestedDate.getTime() / 1000,
        	    nowUnix = new Date().geTime() / 1000,
        	    minTimestamp;

	    	// Set minTimestamp to always have a five day range
        	if (nowUnix - requestedUnix < 432000) {
        		minTimestamp = nowUnix - 432000;
        	}
        	else {
        		minTimestamp = requestedUnix;
        	}
        	return minTimestamp;
        }

    }]);