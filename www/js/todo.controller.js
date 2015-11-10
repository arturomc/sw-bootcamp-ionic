(function() {
	'use strict';

	angular
		.module('todo')
		.controller('TodoController', TodoController);

	TodoController.$inject = ['$ionicModal', '$scope', '$timeout', 'Projects', '$ionicSideMenuDelegate'];

	/* @ngInject */
	function TodoController($ionicModal, $scope, $timeout, Projects, $ionicSideMenuDelegate) {
		var vmTodo = this;

		/* ============= PROPERTIES =============*/
		vmTodo.projects = Projects.all();
		vmTodo.tasks = [];
		vmTodo.activeProject = vmTodo.projects[Projects.getLastActiveIndex()];

		/* ============= TASK METHODS =============*/
		vmTodo.newTask = newTask;
		vmTodo.closeNewTask = closeNewTask;
		vmTodo.createTask = createTask;

		/* ============= PROJECT METHODS =============*/
		vmTodo.createProject = createProject;
		vmTodo.newProject = newProject;
		vmTodo.selectProject = selectProject;
		vmTodo.toggleProjects = toggleProjects;

		activate();

		////////////////

		function activate() {

			// Create and load the Modal
			$ionicModal.fromTemplateUrl('/templates/new-task.html', function(modal) {
				$scope.taskModal = modal;
			}, {
				scope: $scope,
				animation: 'slide-in-up'
			});

			// Try to create the first project, make sure to defer
			// this by using $timeout so everything is initialized
			// properly
			$timeout(function() {
				if (vmTodo.projects.length == 0) {
					while (true) {
						var projectTitle = prompt('Your first project title:');
						if (projectTitle) {
							createProject(projectTitle);
							break;
						}
					}
				}
			});

		}

		/* ============= TASK METHODS =============*/

		// Close the new task modal
		function closeNewTask() {
			$scope.taskModal.hide();
		};

		// Called when the form is submitted
		function createTask(task) {

			if (!vmTodo.activeProject || !task) {
				return;
			}

			vmTodo.activeProject.tasks.push({
				title: task.title
			});

			$scope.taskModal.hide();

			// Inefficient, but save all the projects
			Projects.save($scope.projects);

			task.title = "";
		};

		// Open our new task modal
		function newTask() {
			$scope.taskModal.show();
		}


		/* ============= PROJECT  METHODS =============*/


		// A utility function for creating a new project
		// with the given projectTitle
		function createProject(projectTitle) {
			var newProject = Projects.newProject(projectTitle);
			vmTodo.projects.push(newProject);
			Projects.save(vmTodo.projects);
			vmTodo.selectProject(newProject, vmTodo.projects.length - 1);
		}

		// Called to create a new project
		function newProject() {
			var projectTitle = prompt('Project name');
			if (projectTitle) {
				createProject(projectTitle);
			}
		};


		// Called to select the given project
		function selectProject(project, index) {
			vmTodo.activeProject = project;
			Projects.setLastActiveIndex(index);
			$ionicSideMenuDelegate.toggleLeft(false);
		}


		function toggleProjects() {
			$ionicSideMenuDelegate.toggleLeft();
		}


	}
})();