'use strict';

/* Directives */


angular.module('myApp.directives', []).directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]).directive('dropdown', function() {
	return function(scope, elm, attrs) {
		$(elm).dropdown();
	};
}).directive('loadMapDefaults', function() {
	return {
	    link: function(scope, element, attrs) {
			var mapOptions = {
				center: new google.maps.LatLng(39.183917, -76.805643),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoom: 15
			};	
			scope.map = new google.maps.Map((element || [])[0], mapOptions);
	    }		
	};
});
