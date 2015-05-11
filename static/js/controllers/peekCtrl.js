/************************
 * Peek View Controller *
 ************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('PeekCtrl', ['$scope', 'ViewStateSrv', function ($scope, ViewStateSrv) {


    /*******************
     * Data Management *
     *******************/




    /******************
     * UI Interaction *
     ******************/
    $scope.toggleMainView = function() {
        var curr = ViewStateSrv.getState();
        switch (curr) {
            case 'map':
                window.location.href = "/#/faces";
                break;
            case 'faces':
                window.location.href = "/#/map";
                break;
        }
    };




    /***********
     * Styling *
     ***********/


}]);