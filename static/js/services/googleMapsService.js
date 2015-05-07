/***********************
 * Map View Controller *
 ***********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('GoogleMapsSrv', function () {

        // Holds all maps
    	var maps = {};


        // Adds a map
    	function addMap(mapId) {
    		maps[mapId] = {};
    	};


        // Returns a map given its ID
    	function getMap(mapId) {
    		if (!maps[mapId]) {
    			return -1;
    		}
    		return maps[mapId];
    	};


        // Updates a map's state
        function updateMap(mapId, center, zoom) {
            if (!maps[mapId]) {
                return -1;
            }
            maps[mapId].center = center;
            maps[mapId].zoom = zoom;
        };


        // Returns handles to the service's functions
    	return {
    		addMap: addMap,
    		getMap: getMap,
            updateMap: updateMap
    	};

    });