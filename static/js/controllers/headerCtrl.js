/**************************
 * Header View Controller *
 **************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('HeaderCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {


    /*******************
     * Data Management *
     *******************/

    // Initialize datepicker
    $scope.initialize = function() {


        /* Datepicker */

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
            if (typeof $rootScope.models.date != 'undefined') {
                $('#datepicker').datepicker("setDate", $rootScope.models.date);
                clearInterval(checkForDate);
            }
        }, 100);



        /* Autocomplete */

        var pac_input = document.getElementById('locationPicker');

            (function pacSelectFirst(input) {
                // store the original event binding function
                var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

                function addEventListenerWrapper(type, listener) {
                    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
                    // and then trigger the original listener.
                    if (type == "keydown") {
                        var orig_listener = listener;
                        listener = function(event) {
                            var suggestion_selected = $(".pac-item-selected").length > 0;
                            if (event.which == 13 && !suggestion_selected) {
                                var simulated_downarrow = $.Event("keydown", {
                                    keyCode: 40,
                                    which: 40
                                });
                                orig_listener.apply(input, [simulated_downarrow]);
                            }

                            orig_listener.apply(input, [event]);
                        };
                    }

                    _addEventListener.apply(input, [type, listener]);
                }

                input.addEventListener = addEventListenerWrapper;
                input.attachEvent = addEventListenerWrapper;

                var autocomplete = new google.maps.places.Autocomplete(input);
                var place;

                // Listen for location entries
                google.maps.event.addListener(autocomplete, 'place_changed', function() {

                    // Get location info
                    place = autocomplete.getPlace();
                    var lat = place.geometry.location.lat();
                    var lng = place.geometry.location.lng();
                    var latLng = new google.maps.LatLng(lat, lng)

                    $rootScope.$apply(function() {
                        $rootScope.models.location = latLng;
                        $rootScope.models.zoom = 16;
                    });
                });

            })(pac_input);

    };



    /******************
     * UI Interaction *
     ******************/

    // User changes date
    var handleDateChange = function(dateText) {

        $rootScope.$apply(function() {
            $rootScope.models.date = new Date(dateText);   
        });

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