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

    // Initialize datepicker
    $scope.initialize = function() {
        $("#datepicker").datepicker({
            inline: true,
            showOtherMonths: true,
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            onSelect: function(dateText) {
                handleDateChange(dateText);
            },
            onClose: function() {
                handleDatepickerClose();
            }
        });
        $('#datepicker').datepicker("setDate", new Date());
    };



    /******************
     * UI Interaction *
     ******************/

    // User changes date
    var handleDateChange = function(dateText) {
        console.log(dateText);
    };

    // Otherwise datepicker can't open back up
    var handleDatepickerClose = function() {
        $('input#datepicker').blur();
    }

    // Otherwise datepicker stays in same spot
    $(window).resize(function() {
        $('#datepicker').datepicker('hide');
    });


    /***********
     * Styling *
     ***********/

}]);