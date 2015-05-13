/***************************
 * Site Navigation Service *
 ***************************/

'use strict';


angular
    .module('compositeApp.services')
    .factory('SiteNavigationSrv', function () {

        // Holds firstTime state
        var firstTime = true;


        // Checks if user is just now opening the app
        function checkFirstTime() {
            return firstTime;
        };


        // User's passed the stage of just now opening the app
        function updateTime() {
            firstTime = false;
        }


        // Returns handles to the service's functions
        return {
            checkFirstTime: checkFirstTime,
            updateTime: updateTime,
        };

    });