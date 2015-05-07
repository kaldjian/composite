/*************************
 * Faces View Controller *
 *************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('FacesCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {


    /*******************
     * Data Management *
     *******************/




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