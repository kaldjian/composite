'use strict';


angular
	.module('compositeApp.header')
    .directive('autocomplete',
    	       ['LocationModel',
    	       function (LocationModel) {
    

    return {
    	restrict: 'A',
    	link: function($scope, element, attrs) {
	    	var el = element[0];
	    	var _addEventListener = (el.addEventListener) ? el.addEventListener : el.attachEvent;



	    	/**
	    	 * Simulate a 'down arrow' keypress on hitting 'return' when no pac
	    	 * suggestion is selected, and then trigger the original listener.
	    	 *
	    	 */
	    	var addEventListenerWrapper = function (type, listener) {
	    	    if (type == "keydown") {
	    	        var orig_listener = listener;
	    	        listener = function(event) {
	    	            var suggestion_selected = $(".pac-item-selected").length > 0;
	    	            if (event.which == 13 && !suggestion_selected) {
	    	                var simulated_downarrow = $.Event("keydown", {
	    	                    keyCode: 40,
	    	                    which: 40
	    	                });
	    	                orig_listener.apply(el, [simulated_downarrow]);
	    	            }

	    	            orig_listener.apply(el, [event]);
	    	        };
	    	    }
	    	    _addEventListener.apply(el, [type, listener]);
	    	}


	    	/**
	    	 * Add event listener to the input element
	    	 *
	    	 */
	    	el.addEventListener = addEventListenerWrapper;
	    	el.attachEvent = addEventListenerWrapper;



	    	/**
	    	 * Register a new google maps api autocomplete element. Whenever
	    	 * the value changes, update location model
	    	 *
	    	 */
	    	var autocomplete = new google.maps.places.Autocomplete(el);
	    	var place;
	    	google.maps.event.addListener(autocomplete, 'place_changed', function() {
	    		$scope.$apply(function() {
	    			place = autocomplete.getPlace();
	    			var lat = place.geometry.location.lat();
	    			var lng = place.geometry.location.lng();
	    			LocationModel.setLocation(lat, lng, $scope.location.zoom, $(window).width(), $(window).height());
	    		});
	    	});
	    }
    };



}]);