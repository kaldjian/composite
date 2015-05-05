/***********************
 * Map View Controller *
 ***********************/

angular
	.module('compositeApp')
    .controller('FaceCtrl', function ($scope) {


    	
    

        /******************
         * UI Interaction *
         ******************/
        $scope.hoverIn = function(face) {
            face.fadeTo(200, 0.9);
        }
        $scope.hoverOut = function(face) {
            face.fadeTo(200, 1.0);
        }




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