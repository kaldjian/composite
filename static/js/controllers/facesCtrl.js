/*************************
 * Faces View Controller *
 *************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('FacesCtrl', ['$scope', 'FaceStorageSrv', 'ViewStateSrv', function ($scope, FaceStorageSrv, ViewStateSrv) {


    /*******************
     * Data Management *
     *******************/
    // Update view state for peek box
    ViewStateSrv.updateState('faces');
    
    // Get faces
    $scope.faces = FaceStorageSrv.getFaces();




    /******************
     * UI Interaction *
     ******************/
    $scope.navigateToMap = function() {
        window.location.href = "/#/map";
    };



    /***********
     * Styling *
     ***********/
     $scope.cropFaces = function() {
        $('ul.faces li').each(function() {
            var width = $(this).children('img').width();
            $(this).height(width);
        });
    };
    $scope.cropFaces();

}]);