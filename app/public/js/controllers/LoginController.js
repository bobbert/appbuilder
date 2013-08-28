'use strict';

function LoginController($scope, $http, $rootScope, $location) {
	$scope.user = {};
	$scope.statusMessage = '';

	//figure out where we should redirect to once the user has logged in.
	if (!$rootScope.redirect || $rootScope.redirect == '/login') {
		$rootScope.redirect = '/todos';
	}

	$scope.submit = function(user) {
		$http.post('/user/login', $scope.user).success(function(data) {
			$rootScope.user.username = $scope.user.username;
			$location.path($rootScope.redirect);
		}).error(function(data, status, headers, config) {
			$scope.statusMessage = data;
		});
	}
}
