(function() {
	'use strict';

	angular
		.module('todo')
		.controller('TodoController', TodoController);

	TodoController.$inject = ['$ionicModal', '$scope'];

	/* @ngInject */
	function TodoController($ionicModal, $scope) {
		var vmTodo = this;

		vmTodo.newTask = newTask;
		vmTodo.closeNewTask = closeNewTask;
		vmTodo.createTask = createTask;

		vmTodo.tasks = [];

		activate();

		////////////////

		function activate() {

			// Create and load the Modal
			$ionicModal.fromTemplateUrl('/templates/new-task.html', function(modal) {
				vmTodo.taskModal = modal;
			}, {
				scope: $scope,
				animation: 'slide-in-up'
			});

		}

		// Close the new task modal
		function closeNewTask() {
			vmTodo.taskModal.hide();
		};

		// Called when the form is submitted
		function createTask(task) {
			vmTodo.tasks.push({
				title: task.title
			});
			vmTodo.taskModal.hide();
			task.title = "";
		};

		// Open our new task modal
		function newTask() {
			vmTodo.taskModal.show();
		}

	}
})();