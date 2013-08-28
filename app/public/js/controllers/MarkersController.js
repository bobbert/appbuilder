'use strict';


function MarkersController($scope, $http, Marker) {

	//get the markers from server
	getMarkersFromServer();

	$scope.newMarker = {};
	$scope.map = null;
	$scope.markers = [];
	$scope.bounds = new google.maps.LatLngBounds();

	//function to create a new Marker object
	$scope.createMarker = function(marker) {
		if ($scope.newMarkerForm.$invalid) {
			$scope.statusMessage = 'Invalid marker data';
			return;
		}
		Marker.save({}, $scope.newMarker, function(data) {
			$scope.markers.push(data);
			$scope.statusMessage = 'New marker saved.';
			$scope.newMarker = {};

		}, function(data, status, headers, config) {
			$scope.statusMessage = data;
		});
	}
	
	//function to create a new Marker object
	$scope.getMarkersAsMapPoints = function() {
		if (!$scope.map) {
			return [];
		}
		var markers = _.map($scope.markers, setSingleMarkerAsMapPoint);
		return markers;
	}
	
	function setSingleMarkerAsMapPoint(marker) {
		var newMarkerPosition = new google.maps.LatLng(marker.lat, marker.lon);
		var newMarker = new google.maps.Marker({
		      position: newMarkerPosition,
		      map: $scope.map,
		      title: marker.name
		});
		$scope.bounds.extend(newMarkerPosition);
		return newMarker;
	}
	
	function getMarkersFromServer() {
		Marker.query(function(data) {
			$scope.markers = data;
			$scope.getMarkersAsMapPoints();
			$scope.map.fitBounds($scope.bounds);
		});
	}

}
