$(document).ready(function () {
	$('#map-canvas').on('load', function() {
		var mapOptions = {
			center: new google.maps.LatLng(39.183917, -76.805643),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15
		};	
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);				
	});
});