/**********************
 * Peek State Service *
 **********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('PeekStateSrv', ['MapStateSrv', 'FaceStorageSrv', 'SiteNavigationSrv', function (MapStateSrv, FaceStorageSrv, SiteNavigationSrv) {


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
                    // Initial load
                    if (SiteNavigationSrv.checkFirstTime()) {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function(position) {
                                var pos = new google.maps.LatLng(position.coords.latitude,
                                                                 position.coords.longitude);
                                var mapOptions = {
                                    center: pos,
                                    zoom: 15,
                                    disableDefaultUI: true
                                };
                                var map = new google.maps.Map(document.getElementById('peek-canvas'), mapOptions);
                                MapStateSrv.addMap('mainMap');
                                MapStateSrv.updateMap('mainMap', map.getCenter(), map.getZoom());
                            }, function() {
                                console.log('no geolocation');
                            });
                            SiteNavigationSrv.updateTime();
                        }
                        else {
                            console.log('no geolocation');
                            SiteNavigationSrv.updateTime();
                        }
                    }
                    // Later /faces load
                    else {
                        var map = MapStateSrv.getMap('mainMap');
                        var mapOptions = {
                            center: map.center,
                            zoom: map.zoom,
                            disableDefaultUI: true
                        };
                        map = new google.maps.Map(document.getElementById('peek-canvas'), mapOptions);
                        break;
                    }
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