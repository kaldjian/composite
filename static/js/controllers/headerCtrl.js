/**************************
 * Header View Controller *
 **************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('HeaderCtrl', ['$scope', 'ConstraintsModelSrv', 'FacesModelSrv', function ($scope, ConstraintsModelSrv, FacesModelSrv) {


    /*******************
     * Data Management *
     *******************/

    // Initialize datepicker
    $scope.initialize = function() {

        // Set datepicker options and handlers
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

        // Wait for constratints model date to be initialized, initialize datepicker date
        var checkForDate = window.setInterval(function() {
            if (typeof $scope.constraintsModel.date != 'undefined') {
                $('#datepicker').datepicker("setDate", $scope.constraintsModel.date);
                clearInterval(checkForDate);
            }
        }, 100);
    };



    /******************
     * UI Interaction *
     ******************/

    // User changes date
    var handleDateChange = function(dateText) {
        console.log(dateText);

        // Constraints model update
        ConstraintsModelSrv.update($scope.mapModel, new Date(dateText)).then(function(response) {
            $scope.constraintsModel = response;

            // Faces model update
            FacesModelSrv.update($scope.constraintsModel).then(function(response) {
                $scope.facesModel.faces = response;
                $scope.$apply();

            // Errors from each initialization
            }, function(error) { console.log(error); });
        }, function(error) { console.log(error); });  
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