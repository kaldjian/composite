/***********************
 * Map View Controller *
 ***********************/

angular
	.module('compositeApp')
    .controller('MapCtrl', function ($scope) {


    	
    	$scope.cropFaces = function() {
    		$('ul.faces li').each(function() {
    			var width = $(this).children('img').width();
    			$(this).height(width);
    		});
    	};
    	$scope.cropFaces();

    	$('ul.faces li').mouseenter(function() {
    		$(this).fadeTo(200, 0.8);
    	});
    	$('ul.faces li').mouseleave(function() {
    		$(this).fadeTo(200, 1.0);
    	})

    });