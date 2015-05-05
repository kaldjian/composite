/***********************
 * Map View Controller *
 ***********************/

angular
	.module('compositeApp')
    .controller('FaceCtrl', function ($scope) {


    	
    

        /******************
         * UI Interaction *
         ******************/




        /***********
         * Styling *
         ***********/
         $scope.cropFaces = function() {
            $('ul.faces li').each(function() {
                var width = $(this).children('img').width();
                $(this).height(width);
            });
        };
        $scope.cropFaces();

    });