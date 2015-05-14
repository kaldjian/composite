/**************************
 * Header View Controller *
 **************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('HeaderCtrl', ['$scope', function ($scope) {


    /*******************
     * Data Management *
     *******************/
    $scope.initialize = function() {
        $("#datepicker").datepicker({
            inline: true,
            showOtherMonths: true,
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        });
        $("#datepicker").datepicker("setDate", new Date());
    };



    /******************
     * UI Interaction *
     ******************/



    /***********
     * Styling *
     ***********/

}]);