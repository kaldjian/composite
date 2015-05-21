/***************************
 * Meta (Index) Controller *
 ***************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MetaCtrl', ['$scope', '$location', 'MapModelSrv', 'FacesModelSrv', 'ConstraintsModelSrv', function ($scope, $location, MapModelSrv, FacesModelSrv, ConstraintsModelSrv) {


    /***********
     * Models  *
     ***********/

    // Site State model
    $scope.siteStateModel = {
        activeView: $location.path().replace('/', ''),
    };
    // Map model
    $scope.mapModel = {
        zoom: undefined,
        center: undefined,
        bounds: undefined,
    }
    // Constraints model
    $scope.constraintsModel = {
        location: undefined,
        distance: undefined,
        date: undefined,
    }
    $scope.facesModel = {
        faces: [],
    }


    /*************************
     * Model initializations *
     *************************/

    // Map model initialization
    MapModelSrv.initialize().then(function(response) {
        $scope.mapModel = response;
        $scope.$apply();

        // Wait to initialize constraints model until map model bounds are set
        var checkForBounds = window.setInterval(function() {
            if (typeof $scope.mapModel.bounds != 'undefined') {
                clearInterval(checkForBounds);

                //Constraints model initialization
                ConstraintsModelSrv.update($scope.mapModel, new Date()).then(function(response) {
                    $scope.constraintsModel = response;

                    // Faces model initialization
                    FacesModelSrv.update($scope.constraintsModel).then(function(response) {
                        $scope.facesModel.faces = response;
                        $scope.$apply();

                    // Errors from each initialization
                    }, function(error) { console.log(error); });
                }, function(error) { console.log(error); });  
            }
        }, 100); 
    }, function(error) { console.log(error); });




    /******************
     * UI Interaction *
     ******************/



    /***********
     * Styling *
     ***********/

}]);