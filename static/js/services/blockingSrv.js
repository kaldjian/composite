/********************
 * Blocking Service *
 ********************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('BlockingSrv', ['$http', function ($http) {


        // Initialize blocking
        var blocking = false;



        // Check if currently blocking
        function isBlocking() {
            return blocking;
        };

        // Start blocking
        function startBlocking() {
            blocking = true;
        }

        // Stop blocking
        function stopBlocking() {
            blocking = false;
        }



        // Returns handles to the service's functions
        return {
            isBlocking: isBlocking,
            startBlocking: startBlocking,
            stopBlocking: stopBlocking
        };

    }]);