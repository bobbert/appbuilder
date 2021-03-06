'use strict';

controllersModule.controller('MarkersController', function($scope, $http, Marker) {

	//get the markers from server
	getMarkersFromServer();

	$scope.newMarker = {};
	$scope.map = null;
	$scope.markers = [];
	$scope.bounds = new google.maps.LatLngBounds();
	$scope.markerIcons = ['computers', 'movierental', 'music', 'phones', 'photography', 'videogames'];

	//function to create a new Marker object
	$scope.saveMarker = function(marker) {
		var isNew = _.isEmpty(marker)
		var params = {}
		if (!validateNewMarker(marker || $scope.newMarker)) {
			$scope.statusMessage = 'Invalid marker data';
			return;
		}
		if (!isNew) {
			params.id = marker._id;
		}
		Marker.save(params, (marker || $scope.newMarker), function(data) {
			$scope.markers.push(data);
			$scope.statusMessage = (isNew ? 'New marker saved.' : ('Marker ' + marker.name + ' updated.'));
			setSingleMarkerAsMapPoint($scope.newMarker);
			$scope.newMarker = {};

		}, function(data, status, headers, config) {
			$scope.statusMessage = data;
		});
	}

	//remove complete todos
	$scope.deleteMarker = function(marker) {
		//delete on server
		marker.$delete({
			id: marker._id
		}, function() { 
			// post-server callback: also remove from client
			$scope.markers.splice($scope.markers.indexOf(marker), 1);
			$scope.statusMessage = "Deleted marker '" + marker.name + "'.";
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

	$scope.getIconPathFromMarker = function(marker) {
		return $scope.getIconPathFromType(marker && marker.iconType);
	}

	$scope.getIconPathFromType = function(iconType) {
		if (iconType) {
			return '/img/' + iconType + '.png';
		}
		else {
			return '/img/red_marker.png';
		}
	}

	$scope.initFields = function(lat, lon, iconType) {
		$scope.newMarker = {
			lat: lat,
			lon: lon,
			iconType: iconType
		};		
	}

	function setSingleMarkerAsMapPoint(marker) {
		var newMarkerPosition = new google.maps.LatLng(marker.lat, marker.lon);
		var newMarker = new google.maps.Marker({
		      position: newMarkerPosition,
			  icon: $scope.getIconPathFromMarker(marker),
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
			if (_.isObject($scope.map)) {
				$scope.map.fitBounds($scope.bounds);				
			}
		});
	}

	function validateNewMarker(newMarker) {
		return _.isObject(newMarker) &&
		   _.isNumber(newMarker.lat) && (newMarker.lat > -80) && (newMarker.lat < 80) &&
		   _.isNumber(newMarker.lon) && (newMarker.lat > -180) && (newMarker.lat < 180) &&
		   !_.isEmpty(newMarker.name);
	}
  }
);
