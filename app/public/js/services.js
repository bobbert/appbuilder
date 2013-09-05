'use strict';


angular.module('myApp.services', ['ngResource']).value('version', '0.1')
  .factory('Todo', function($resource) {
	return $resource('api/Todo/:id', {}, {});
}).factory('Marker', function($resource) {
	return $resource('api/Marker/:id', {}, {});
});
