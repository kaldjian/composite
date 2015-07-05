'use strict';


angular
    .module('compositeApp.common')
    .service('LocationModel',
    	     ['$rootScope', 'FacesModel', 'DateModel',
    	     function ($rootScope, FacesModel, DateModel) {


	/**
	 * Private variables, setters
	 *
	 */ 
	var location = {
		lat: null,
    	lng: null,
    	reverseGeocode: null,
    	zoom: null,
    	radius: null
	};

	var setLocationLat = function (lat) {
		location.lat = lat;
	};

	var setLocationLng = function (lng) {
		location.lng = lng;
	};

	var setLocationReverseGeocode = function (lat, lng) {
		return new Promise(function(resolve, reject) {

			// Basic
			location.reverseGeocode = "(" + String(lat) + ", " + String(lng) + ")";

			// Advanced
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'latLng': new google.maps.LatLng(lat, lng)}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[1]) {
						location.reverseGeocode = results[1].formatted_address;
						resolve(location.reverseGeocode);
					}
					else {
						resolve("Successfully geocoded, but no results");
					}
				}
				else {
					resolve("Couldn't geocode");
				}
			});
		});
	};

	var setLocationZoom = function (zoom) {
		location.zoom = zoom;
	};

	var setLocationRadius = function (radius) {
		location.radius = radius;
	}



	/**
	 * Primary model accessor
	 *
	 */
	this.getLocation = function () {
		return location;
	};



    /**
     * Sets this.location values based on parameter values and the
     * resulting calculated radius. Then calls FacesModel.setFaces()
     * to update faces model.
     *
     */
    this.setLocation = function (lat, lng, zoom, mapWidth, mapHeight) {
    	setLocationLat(lat);
    	setLocationLng(lng);
    	setLocationZoom(zoom);
    	setLocationReverseGeocode(lat, lng).then(function(response) {

    		calculateRadius(lat, lng, zoom, mapWidth, mapHeight).then(function(response) {
    			setLocationRadius(response);
    			$rootScope.$apply(); // Apply location model changes
    			FacesModel.setFaces(location.lat, location.lng, location.radius, DateModel.getDate());
    		});
    	});
    };



    /**
     * Calls this.setLocation with geolocation's coordinates or a default
     * location (Evanston, IL) if that fails
     *
     */
    this.geolocate = function(zoom) {
    	var self = this;
    	var location;

		// If geolocation is available
		if (navigator.geolocation) {

			// Try getting current position
		    navigator.geolocation.getCurrentPosition(function(position) {
		        location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		        self.setLocation(location.lat(), location.lng(), zoom, $(window).width(), $(window).height());
		    }, function() {

		        // If you can't, use default location
		        location = new google.maps.LatLng(42.056459, -87.675267);
		        self.setLocation(location.lat(), location.lng(), zoom, $(window).width(), $(window).height());
		    });
		}

		// Geolocation isn't available, use default location
		else {
		    location = new google.maps.LatLng(42.056459, -87.675267);
		    self.setLocation(location.lat(), location.lng(), zoom, $(window).width(), $(window).height());
		}
    };



    /**
     * Calculates the radius, in meters, of a map at a given center and zoom,
     * and with a certain viewport size
     *
     * @param lat {Number} - Map center's latitude coordinates
     * @param lng {Number} - Map center's longitude coordinates
     * @param zoom {Number} - Map's zoom value
     * @param mapWidth {Number} - Map's viewport width
     * @param mapHeight {Number} - Map's viewport height
     */
    var calculateRadius = function(lat, lng, zoom, mapWidth, mapHeight) {
    	return new Promise(function(resolve, reject) {
    		var TILE_SIZE = 256;

    		var _pixelOrigin = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
    		var _pixelsPerLonDegree = TILE_SIZE / 360;
    		var _pixelsPerLonRadian = TILE_SIZE / (2 * Math.PI);

    		var degreesToRadians = function(deg) {
    		    return deg * (Math.PI / 180);
    		};

    		var radiansToDegrees = function(rad) {
    		    return rad / (Math.PI / 180);
    		};

    		var bound = function(val, min, max) {
    		    var res = Math.max(val, min);
    		    res = Math.min(res, max);
    		    return res;
    		};

    		var toPoint = function(lat, lng, zoom) {
    		    var x = _pixelOrigin.x + (lng * _pixelsPerLonDegree);

    		    var siny = bound(Math.sin(degreesToRadians(lat)), -0.9999, 0.9999);
    		    var y = _pixelOrigin.y + (0.5 * Math.log((1 + siny) / (1 - siny)) * _pixelsPerLonRadian);

    		    var point = new google.maps.Point(x, y);
    		    return point;
    		};

    		var toLatLng = function(point, zoom) {
    		    var lng = (point.x - _pixelOrigin.x) / _pixelsPerLonDegree;
    		    var latRadians = (point.y - _pixelOrigin.y) / _pixelsPerLonRadian;
    		    var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

    		    return new google.maps.LatLng(lat, lng);
    		};

    		var clat = lat;
    		var clng = lng;
    		var cp = toPoint(clat, clng, zoom);

    		var zf = Math.pow(2, zoom) * 2;
    		var dw = mapWidth / zf;
    		var dh = mapHeight / zf;

    		var north = toLatLng(new google.maps.Point(cp.x, cp.y + dh), zoom);
    		var west = toLatLng(new google.maps.Point(cp.x - dw, cp.y), zoom);

    		var dx = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat, lng), north);
    		var dy = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat, lng), west);

    		resolve(Math.min(dx, dy));
    	});
    };



    /**
     * On script load
     *
     */
    this.geolocate(15);
}]);