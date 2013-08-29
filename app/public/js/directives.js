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
}).directive('draggable', function() {
	return function(scope, elm, attrs) {
		$(elm).draggable();
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
			scope.map.scope = scope;
			google.maps.event.addListener(scope.map, 'click', function(event) {
	            var location = event.latLng;
				if (_.isObject(scope)) {
					scope.initLatLon(location.lat(), location.lng());
				}
				$('#addNewMarker').modal({ backdrop: false, keyboard: false, show: true });
				$('#addNewMarker #newMarkerVisibility').trigger('click');
				$('div.modal-body .close-new-marker-form').removeClass('hidden');
	        });

			$(scope.map).droppable({
				drop: function( event, ui ) {
					if ($(this).filter('#map-canvas').length > 0) {
						$(this).trigger('click');
					}
				}
			});
	
	    }		
	};
});
