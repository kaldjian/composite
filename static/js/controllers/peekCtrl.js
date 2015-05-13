/************************
 * Peek View Controller *
 ************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('PeekCtrl', ['$scope', function ($scope) {


    /*******************
     * Data Management *
     *******************/
     
    // Initialize peek box
    $scope.initializePeek = function() {
        switch ($scope.siteStateModel.activeView) {
            case 'faces':
                $scope.implementView('faces');
                break;
            case 'map':
                $scope.implementView('map');
                break;
        }
    };

    // Implement correct peek box
    $scope.implementView = function(activeView) {
        switch (activeView) {
            case 'faces':
                $('div#peek-faces').hide();
                $('div#peek-map').show();
                $scope.$watch('mapModel', function() {
                    var mapOptions = {
                        center: $scope.mapModel.center,
                        disableDefaultUI: true,
                        disableDoubleClickZoom: true,
                        draggable: false,
                        zoom: $scope.mapModel.zoom,
                    };
                    var peekMap = new google.maps.Map(document.getElementById('peek-map'), mapOptions);
                });
                break;
            case 'map':
                $('div#peek-map').hide();
                $('div#peek-faces').show();
                break;
        }
    };




    /******************
     * UI Interaction *
     ******************/
    $scope.toggleActiveView = function() {
        switch ($scope.siteStateModel.activeView) {
            case 'faces':
                window.location.href = "/#/map";
                $scope.siteStateModel.activeView = 'map';
                $scope.implementView('map');
                break;
            case 'map':
                window.location.href = "/#/faces";
                $scope.siteStateModel.activeView = 'faces';
                $scope.implementView('faces');
                break;
        }
    };




    /***********
     * Styling *
     ***********/


}]);