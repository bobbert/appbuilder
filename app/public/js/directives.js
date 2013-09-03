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
}).directive('copydraggable', function() {
	return function(scope, elm, attrs) {
		scope.isDragging = true;
		$(elm).addClass('copydraggable').css('z-index', 999).draggable({helper:'clone'});
	};
}).directive('loadMapDefaults', function() {
	return {
	    link: function(scope, element, attrs) {
			var overlay = null;
			var mapOptions = {
				center: new google.maps.LatLng(39.183917, -76.805643),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoom: 15
			};	
			scope.map = new google.maps.Map((element || [])[0], mapOptions);
			scope.overlay = new google.maps.OverlayView();
			scope.overlay.draw = function() {};
			scope.overlay.setMap(scope.map);
			
			scope.map.scope = scope;
			google.maps.event.addListener(scope.map, 'click', function(event) {
				var location;

				// if event passed in is a jQuery Event, then get lat/lon from overlay projection; 
				// otherwise get lat/lon from Google Maps event.
				if (jQuery.Event.prototype.isPrototypeOf(event)) {
					var mapLocation = {x: event.pageX - $('#map-canvas').offset().left, y: event.pageY - $('#map-canvas').offset().top }
					var point = new google.maps.Point(mapLocation.x, mapLocation.y);
					location = scope.overlay.getProjection().fromContainerPixelToLatLng(point);
				}
				else {
					location = event.latLng;
				}
				if (_.isObject(scope)) {
					scope.initFields(location.lat(), location.lng(), (event || {}).iconType);
				}
				$('#addNewMarker').modal({ backdrop: false, keyboard: false, show: true });
				$('#addNewMarker #newMarkerVisibility').trigger('click');
				$('div.modal-body .close-new-marker-form').removeClass('hidden');
	        });

			$(element).droppable({
				accept: ".copydraggable",
				drop: function( event, ui ) {
					event.iconType = $(ui.helper).find('img').data('icontype');
					scope.isDragging = false;
					google.maps.event.trigger(scope.map, 'click', event);
				}
			})
	
	    }		
	};
});
