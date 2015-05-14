/***************************
 * Meta (Index) Controller *
 ***************************/

'use strict';


angular
    .module('compositeApp.controllers')
    .controller('MetaCtrl', ['$scope', '$location', 'ManipulateMapModel', 'ManipulateFacesModel', function ($scope, $location, ManipulateMapModel, ManipulateFacesModel) {


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
    // Site State model
    $scope.siteStateModel = {
        activeView: $location.path().replace('/', ''),
    };

    // Initialize map model
    ManipulateMapModel.initialize().then(function(response) {
        $scope.mapModel = response;        

        // Once map model is initialized, update faces model
        ManipulateFacesModel.update($scope.mapModel).then(function(response) {
            $scope.facesModel.faces = response;
            $scope.$apply();
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