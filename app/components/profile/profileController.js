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

			vm.AppCtrl = function($scope){
				$scope.currentNavItem = 'name';
			}
			vm.updatePassword = function() {
				vm.dataLoading = true;
				// vm.authData = UserService.Base64.encode(vm.students.username + ':' + vm.user.oldPassword);
				// console.log(vm.authData);
				vm.oldAuthData = $rootScope.globals.currentUser.authdata;
				UserService.SetCredentials(vm.students.username, vm.user.oldPassword);
				vm.newAuthData = $rootScope.globals.currentUser.authdata;
				// vm.oldAuthData = vm.students.authdata;
				if (vm.oldAuthData != vm.newAuthData) {
					console.log('failure');
					// $state.go('root.home');
				}
				else {
					//STILL HAVE TO CHANGE API AND CREATE TOAST FOR FAILURE
					vm.user.password = vm.user.newPassword;
					UserService.SetCredentials(vm.students.username, vm.user.newPassword);
					UserService.Update(vm.user)
								.then(function(response) {
									if (resonse.status == 200) {
										FlashService.Success('Update Successful', true);
										$location.path('/home');
									}
									else {
										FlashService.Error(response.message);
									}
								});
					console.log('success');
					location.reload();
					$state.go('root.home');
				}
			}

			vm.updateName = function() {
				vm.dataLoading = true;
				if (vm.user.name == null) {
					vm.user.name = vm.students.name;
				}
				vm.user.id = vm.students.id;
				console.log(vm.user);
				if (vm.user.name == null && vm.user.password == null) {
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