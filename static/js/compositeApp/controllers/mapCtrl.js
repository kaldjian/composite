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
            $scope.mapCenter = new google.maps.LatLng(42.056459, -87.675267);

        	var mapOptions = {
          		center: $scope.mapCenter,
          		zoom: 15,
          		disableDefaultUI: true
        	};
        	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            google.maps.event.addListener(map, 'dragend', function() {
                $scope.mapCenter = map.getCenter();
            });

        };



        /******************
         * UI Interaction *
         ******************/
        $scope.navigateToFaces = function() {
        	window.location.href = "/faces";
        };




        /***********
         * Styling *
         ***********/


        /***********
         * Helpers *
         ***********/
        var latLangToString = function(ll) {
            var lat = ll.lat;
            var lang = ll.lang;
            return String(lat) + ', ' + String(lang);
        };
        
    	
    	

    });