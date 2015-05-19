/***************************
 * Meta (Index) Controller *
 ***************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MetaCtrl', ['$scope', '$location', 'ManipulateMapModel', 'ManipulateFacesModel', 'ManipulateConstraintsModel', function ($scope, $location, ManipulateMapModel, ManipulateFacesModel, ManipulateConstraintsModel) {


    /*******************
     * Data Management *
     *******************/

    // Map model
    $scope.mapModel = {
        center: undefined,
        zoom: undefined,
    };
    // Faces model
    $scope.facesModel = {
        faces: {},
    };
    // Constraints model
    $scope.constraintsModel = {}
    // Site State model
    $scope.siteStateModel = {
        activeView: $location.path().replace('/', ''),
    };

    // Initialize map model
    ManipulateMapModel.initialize().then(function(response) {
        $scope.mapModel = response;

        // Once map model is initialized, update constraints model
        ManipulateConstraintsModel.update($scope.mapModel).then(function(response) {
            $scope.constraintsModel = response;

            // Once constraints model is initialized, update faces model
            ManipulateFacesModel.update($scope.mapModel).then(function(response) {
                $scope.facesModel.faces = response;
                $scope.$apply();
            }, function(error) {
                console.log(error);
            });
        }, function(error) {
            console.log(error);
        });   
    }, function(error) {
        console.log(error);
    });




    /******************
     * UI Interaction *
     ******************/



    /***********
     * Styling *
     ***********/

}]);