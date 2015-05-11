/**********************
 * View State Service *
 **********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('ViewStateSrv', ['FaceStorageSrv', function (FaceStorageSrv) {

        // Holds all faces
        var viewState;


        // Adds a map
        function updateState(state) {
            viewState = state;
            implementState();
        };


        // Implements view state
        function implementState() {
            switch (viewState) {

                case 'map':
                    var faces = FaceStorageSrv.getFaces();
                    var facesMarkup = "<ul class='faces-peek'>";
                    for (var i=0; i<faces.length; i++) {
                        facesMarkup += "<li><img src='" + faces[i] + "'/></li>";
                        // console.log(faces[i]);
                    }
                    facesMarkup += "</ul>";
                    $('div#peek-canvas').html(facesMarkup);
                    break;

                case 'faces':
                    var mapOptions = {
                        center: new google.maps.LatLng(42.056459, -87.675267),
                        zoom: 15,
                        disableDefaultUI: true
                    };
                    var map = new google.maps.Map(document.getElementById('peek-canvas'), mapOptions);
                    break;
            }
        };


        // Retrieves view state
        function getState() {
            return viewState;
        };





        // Returns handles to the service's functions
        return {
            updateState: updateState,
            getState: getState,
        };

    }]);