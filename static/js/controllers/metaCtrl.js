/***************************
 * Meta (Index) Controller *
 ***************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MetaCtrl', ['$scope', '$location', '$rootScope', 'ModelsSrv', function ($scope, $location, $rootScope, ModelsSrv) {


    /***********
     * Models  *
     ***********/

    $rootScope.models = {
        activeView: $location.path().replace('/', ''),

        date:       undefined,

        location:   undefined,
        zoom:       undefined,

        faces:      undefined,
    };
    $rootScope.constants = {
        peekMap: {
            WIDTH: 242,
            HEIGHT: 242,
        }
    };



    /*************************
     * Model initializations *
     *************************/

    // Map model initialization
    ModelsSrv.initialize($rootScope.models, $rootScope.constants).then(function(response) {
        $rootScope.models = response;
        $rootScope.$apply();

        $rootScope.$watch('models.location', function() {

            ModelsSrv.getFaces($rootScope.models.location,
                               $rootScope.models.zoom,
                               $rootScope.models.date,
                               $rootScope.constants).then(function(response) {

                $rootScope.models.faces = response;

            }, function(error) { console.log(error) });
        });

        $rootScope.$watch('models.zoom', function() {

            ModelsSrv.getFaces($rootScope.models.location,
                               $rootScope.models.zoom,
                               $rootScope.models.date,
                               $rootScope.constants).then(function(response) {

                $rootScope.models.faces = response;

            }, function(error) { console.log(error) });
        });

        $rootScope.$watch('models.date', function() {

            ModelsSrv.getFaces($rootScope.models.location,
                               $rootScope.models.zoom,
                               $rootScope.models.date,
                               $rootScope.constants).then(function(response) {

                $rootScope.models.faces = response;

            }, function(error) { console.log(error) });
        });


    }, function(error) { console.log(error) });




    /******************
     * UI Interaction *
     ******************/



    /***********
     * Styling *
     ***********/

}]);