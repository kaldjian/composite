/************************
 * Peek View Controller *
 ************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('PeekCtrl', ['$scope', 'MapModelSrv', function ($scope, MapModelSrv) {


    /*******************
     * Data Management *
     *******************/
     
    // Initialize peek box
    $scope.initializePeek = function() {
        switch ($scope.siteStateModel.activeView) {
            case 'faces':
                implementView('faces');
                break;
            case 'map':
                implementView('map');
                break;
        }
    };

    // Implement correct peek box
    var implementView = function(activeView) {
        switch (activeView) {

            // implement faces view's peek box
            case 'faces':

                // show the appropriate div
                $('div#peek-faces').hide();
                $('div#peek-map').show();

                // whenever the map model changes, update the map
                $scope.$watch('mapModel', function() {

                    // create map options
                    var mapOptions = {
                        center: $scope.mapModel.center,
                        disableDefaultUI: true,
                        disableDoubleClickZoom: true,
                        draggable: false,
                        scrollwheel: false,
                        zoom: $scope.mapModel.zoom - 1,
                    };

                    // create the map instance
                    var peekMap = new google.maps.Map(document.getElementById('peek-map'), mapOptions);

                    // when it's loaded, update the mapModel's bounds
                    google.maps.event.addListener(peekMap, 'tilesloaded', function() {
                        $scope.mapModel = MapModelSrv.setBounds($scope.mapModel, peekMap.getBounds());
                        $scope.$apply();
                    });
                });
                break;

            // implement map view's peek box
            case 'map':

                // show the appropriate div
                $('div#peek-map').hide();
                $('div#peek-faces').show();

                // keep checking for faces until there are some
                var checkForFaces = window.setInterval(function() {
                    if ($scope.facesModel.faces.length > 0){
                        clearInterval(checkForFaces);
                        $scope.cropFaces();
                    }
                }, 100);
                break;
        }
    };




    /******************
     * UI Interaction *
     ******************/

    // Toggle active view on peek box click
    $scope.toggleActiveView = function() {
        switch ($scope.siteStateModel.activeView) {
            case 'faces':
                window.location.href = "/#/map";
                $scope.siteStateModel.activeView = 'map';
                implementView('map');
                break;
            case 'map':
                window.location.href = "/#/faces";
                $scope.siteStateModel.activeView = 'faces';
                implementView('faces');
                break;
        }
    };




    /***********
     * Styling *
     ***********/

    // Crop images into squares
    $scope.cropFaces = function() {
        $('ul.faces-peek li').each(function() {
            var width = $(this).children('img').width();
            $(this).height(width);
        });
    };


}]);