'use strict';


angular
	.module('compositeApp.common')
	.service('DateModel',
		     [
		     function () {
    

	/**
	 * Private variables, setters
	 *
	 */
    var date = {
    	requestedDate: null,
    	minTimestamp: null
    };



    /**
     * Primary model accessor
     *
     */
    this.getDate = function() {
    	return date;
    };



    /**
     * Sets date value in model
     *
     * @param {Date object} requestedDate - Date object containing selected date to set
     */
    this.setDate = function(requestedDate) {
    	date.requestedDate = requestedDate;
    	date.minTimestamp = calculateMinTimestamp(requestedDate);
    };



    /**
     * Calculates a minimum timestamp for instagram request, always
     * ensure a range of 5 days (432000 seconds)
     *
     * @param requestedDate {Date} - Date requested by user
     */
    var calculateMinTimestamp = function (requestedDate) {
    	var requestedUnix = requestedDate.getTime() / 1000,
    	    nowUnix = new Date().getTime() / 1000,
    	    minTimestamp;

    	// Set minTimestamp to always have a five day range
    	if (nowUnix - requestedUnix < 432000) {
    		minTimestamp = nowUnix - 432000;
    	}
    	else {
    		minTimestamp = requestedUnix;
    	}
    	return minTimestamp;
    };



    /**
     * On script load
     *
     */
    this.setDate(new Date());
}]);