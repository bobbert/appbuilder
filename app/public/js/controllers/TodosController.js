'use strict';

controllersModule.controller('TodosController', function($scope, $http, Todo) {

	//get the todos from server
	getTodosFromServer()

	$scope.newTodo = {};

	//function to create a new Todo object
	$scope.createTodo = function(todo) {
		if ($scope.newTodoForm.$invalid) {
			return;
		}
		Todo.save({}, $scope.newTodo, function(data) {
			$scope.todos.push(data);
			$scope.statusMessage = '';
			$scope.newTodo = {};

		}, function(data, status, headers, config) {
			$scope.statusMessage = data;
		});
	}

	//we'll call this function when the checkbox of a todo is checked
	$scope.markComplete = function(todo) {
		todo.$save({
			id: todo._id
		});
	}

	//remove complete todos
	$scope.removeComplete = function() {
		$scope.todos.forEach(function(todo) {
			if (todo.complete) {
				todo.$delete({
					id: todo._id
				}, function() { //delete on server
					$scope.todos.splice($scope.todos.indexOf(todo), 1); //remove from client
				});
			}
		})
	}

	function getTodosFromServer() {
		Todo.query(function(data) {
			$scope.todos = data;
		});
	}
  }
);

