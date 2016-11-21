(function(){
	angular.module('GradeBook')

		.controller('profileController', ['$mdDialog', 'studentService', 'UserService', '$cookies', '$state', '$rootScope',
            function ($mdDialog, studentService, UserService, $cookies, $state, $rootScope) {
			var vm = this;
			vm.students = $rootScope.globals.currentUser;
			console.log(vm.students);

			UserService.GetById($rootScope.globals.currentUser.username).then(function(data) {
				$rootScope.globals.studentName = data.data[0].name;
				vm.students.name = data.data[0].name;

			})

			vm.goHome = function() {
				$state.go('root.home');
			}

		}]);
	})()