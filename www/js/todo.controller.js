(function() {
    'use strict';

    angular
        .module('todo')
        .controller('TodoController', TodoController);

    TodoController.$inject = [];

    /* @ngInject */
    function TodoController() {
        var vmTodo = this;

        activate();

        vmTodo.tasks = [
        	{title: 'Collect coins'},
        	{title: 'Eat mushrooms'},
        	{title: 'Get high enough to grab the flag'},
        	{title: 'Find the Princess'}
        ];
        ////////////////

        function activate() {
        }


    }
})();