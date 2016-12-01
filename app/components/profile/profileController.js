(function(){
	angular.module('GradeBook')

		.controller('profileController', ['$mdDialog', '$location', 'studentService', 'UserService', '$cookies', 'FlashService', '$state', '$rootScope',
            function ($mdDialog, $location, studentService, UserService, $cookies, FlashService, $state, $rootScope) {
			var vm = this;
			vm.students = $rootScope.globals.currentUser;
			console.log(vm.students);

			UserService.GetById($rootScope.globals.currentUser.username).then(function(data) {
				console.log(data.data[0]);
				$rootScope.globals.studentName = data.data[0].name;
				vm.students.name = data.data[0].name;
				vm.students.id = data.data[0]._id;
			})
			vm.goHome = function() {
				$state.go('root.home');
			}

			vm.update = function() {
				vm.dataLoading = true;
				if (vm.user.name == null) {
					vm.user.name = vm.students.name;
				}
				if (vm.user.id == null) {
					vm.user.id = vm.students.id;
				}
				console.log(vm.user);
				if (vm.user.name == null && vm.user.id == null && vm.user.password == null) {
					$state.go('root.home');
				}
				else {
					UserService.Update(vm.user)
								.then(function(response) {
									if (response.status == 200) {
										FlashService.Success('Update Successful', true);
										$location.path('/home');
									}
									else {
										FlashService.Error(response.message);
									}
								});
					location.reload();
					$state.go('root.home');
				}
			}

		}]);
	})()