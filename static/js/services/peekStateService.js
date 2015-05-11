/**********************
 * Peek State Service *
 **********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('PeekStateSrv', ['FaceStorageSrv', function (FaceStorageSrv) {


        // Holds current view state
        var viewState;


        // Updates view state and implements the appropriate peek box
        function updateState(state) {
            viewState = state;
            implementPeek();
        };


        // Implements a view state's peek box
        function implementPeek() {
            switch (viewState) {

                case 'map':
                    var faces = FaceStorageSrv.getFaces();
                    var facesMarkup = "<ul class='faces-peek'>";
                    for (var i=0; i<faces.length; i++) {
                        facesMarkup += "<li><img src='" + faces[i] + "'/></li>";
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