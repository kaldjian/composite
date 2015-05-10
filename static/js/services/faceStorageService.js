/************************
 * Face Storage Service *
 ************************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('FaceStorageSrv', function () {

        // Holds all faces
        var faces = [];


        // Adds a map
        function updateFaces(faceList) {
            faces = faceList;
        };


        // Retrieves faces
        function getFaces() {
            return faces;
        }


        // Returns handles to the service's functions
        return {
            updateFaces: updateFaces,
            getFaces: getFaces,
        };

    });