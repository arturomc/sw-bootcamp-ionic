(function() {
	'use strict';

	angular
		.module('todo')
		.factory('Projects', Projects);

	Projects.$inject = [];

	/* @ngInject */
	function Projects() {
		var service = {
			all: all,
			save: save,
			newProject: newProject,
			getLastActiveIndex: getLastActiveIndex,
			setLastActiveIndex: setLastActiveIndex
		};
		return service;

		////////////////

		function all() {
			var projectString = typeof window.localStorage['projects'] !== 'undefined' ? window.localStorage['projects'] : '';
			if (projectString) {
				return angular.fromJson(projectString);
			}
			return [];
		}

		function save(projects) {
			window.localStorage['projects'] = angular.toJson(projects);
		}

		function newProject(projectTitle) {
			// Add a new project
			return {
				title: projectTitle,
				tasks: []
			};
		}

		function getLastActiveIndex() {
			return parseInt(window.localStorage['lastActiveProject']) || 0;
		}

		function setLastActiveIndex(index) {
			window.localStorage['lastActiveProject'] = index;
		}
	}
})();