(function(){
	angular.module('GradeBook')
		// .directive('toolBar', function() {
		// 	return {
		// 		restrict: 'E',
		// 		templateUrl: 'app/shared/toolbar/toolbar.html',
		// 		controller: 'toolBarController',
		// 		controllerAs: 'toolBarVM'
		// 	}
		// })

		.controller('toolBarController', ['$mdSidenav', '$state', 'UserService', '$rootScope',
            function ($mdSidenav, $state, UserService, $rootScope) {
			    var vm = this;
			    vm.students = $rootScope.globals.currentUser;
			    // vm.student.name = data.data[0].name;
			    vm.openLeftSideNav = function(){ 
			    	$mdSidenav('left').toggle();
			    };
   
			    UserService.GetById($rootScope.globals.currentUser.username).then(function(data) {
			    	$rootScope.globals.studentName = data.data[0].name;
			    	vm.students.name = vm.checkLetterCase(data.data[0].name);
			    })

			    vm.goHome = function() {
			    	//console.log('hi');
			    	$state.go('root.home');
			    }

			$rootScope.$on('$stateChangeSuccess', 
				function(event, toState, toParams, fromState, fromParams){
					vm.dir = $state.current.name;
					vm.checkdir(vm.dir);
				})

			vm.checkLetterCase = function(str) {
				    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			}	
			vm.checkdir = function(dir) {
				var index = dir.search("root");
				if(index != -1) {
					vm.dir = dir.slice(5);
				}
				vm.dir = vm.dir.charAt(0).toUpperCase() + vm.dir.slice(1);
				if(vm.dir == 'Course') {
					vm.dir = 'Semester  >  Course';
				}
				else if (vm.dir == 'Home') {
					vm.dir = 'Home  >  Current Semester';
				}
				else if (vm.dir == 'Grade') {
					vm.dir = 'Semester  >  Course  >  Grade';
				}
				else if(vm.dir == 'Profile') {
					vm.dir = 'Edit Profile';
				}
			}
         	vm.dir = $state.current.name;
			vm.checkdir(vm.dir);
			vm.goHome = function() {
				//console.log('hi');
				$state.go('root.home');
			}

			vm.userProfile = function() {
				$state.go('root.profile');
			}

			vm.Logout = function () {
			        UserService.ClearCredentials();
			        $state.go('login');
			    }
		    }])

})()

