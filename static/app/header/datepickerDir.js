'use strict';


angular
	.module('compositeApp.header')
    .directive('datepicker',
    	       ['DateModel',
    	       function (DateModel) {
    

    return {
    	restrict: 'A',
    	link: function($scope, element, attrs) {


    		/**
    		 * Grab actual element
    		 *
    		 */
    		var el = element[0];



    		/**
    		 * Initialize datepicker
    		 *
    		 */
	    	$(el).datepicker({
	    		inline: true,
	    		showOtherMonths: true,
	    		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	    		onSelect: function() {
	    		    $scope.handleDateChange();
	    		},
	    		onClose: function() {
	    		    $(el).blur();
	    		}
	    	});



	    	/**
	    	 * Handles datepicker date change
	    	 *
	    	 * @param {String} dateText - String containing the new selected date
	    	 */
	    	$scope.handleDateChange = function() {
	    		var date = $(el).datepicker('getDate');
	    	    DateModel.setDate(date)
	    	};



	    	/**
	    	 * Hide the datepicker whenever window resizes. Otherwise,
	    	 * it'll just stay in the same spot.
	    	 *
	    	 */
	    	$(window).resize(function() {
	    		$(el).datepicker('hide');
	    	});



	    	/**
	    	 * Set iniitial date to display from date model
	    	 *
	    	 */
	    	$(el).datepicker('setDate', DateModel.getDate().requestedDate);
	    }
    };
    


}]);