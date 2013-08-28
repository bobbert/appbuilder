'use strict';


function RegisterController($scope, $http, $rootScope, $location) {
	$scope.user = {};
	$scope.statusMessage = '';

	$scope.submit = function(user) {
		$http.post('/user/register', $scope.user).success(function(data) {
			$rootScope.user.username = $scope.user.username;
			$location.path('/todos');
		}).error(function(data, status, headers, config) {
			$scope.statusMessage = data;
		});
	}
}
