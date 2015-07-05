'use strict';


angular
    .module('compositeApp.header')
    .controller('HeaderCtrl',
    	       ['$scope', 'LocationModel',
    	       function ($scope, LocationModel) {



    $scope.location = LocationModel.getLocation();


}]);