/************************
 * Peek View Controller *
 ************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('PeekCtrl', ['$scope', 'PeekStateSrv', function ($scope, PeekStateSrv) {


    /*******************
     * Data Management *
     *******************/




    /******************
     * UI Interaction *
     ******************/
    $scope.toggleMainView = function() {
        var curr = PeekStateSrv.getState();
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