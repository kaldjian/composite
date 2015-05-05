/***********************
 * Face View Controller *
 ***********************/

angular
	.module('compositeApp')
    .controller('MapCtrl', function ($scope) {


    	/***************
         * Google Maps *
         ***************/
        $scope.initializeMap = function() {
        	var mapOptions = {
          		center: { lat: 42.056459, lng: -87.675267},
          		zoom: 15,
          		disableDefaultUI: true
        	};
        	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        }



        /******************
         * UI Interaction *
         ******************/
        




        /***********
         * Styling *
         ***********/
        
    	
    	

    });