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
			    vm.openLeftSideNav = function(){ 
			    	$mdSidenav('left').toggle();
			    };
    
			    vm.goHome = function() {
			    	//console.log('hi');
			    	$state.go('root.home');
			    }

			$rootScope.$on('$stateChangeSuccess', 
				function(event, toState, toParams, fromState, fromParams){
					vm.dir = $state.current.name;
					vm.checkdir(vm.dir);
				})

			vm.checkdir = function(dir) {
				var index = dir.search("root");
				if(index != -1) {
					vm.dir = dir.slice(5);
				}
				vm.dir = vm.dir.charAt(0).toUpperCase() + vm.dir.slice(1);
				if(vm.dir == 'Course') {
					vm.dir = 'Semester  >  Course';
				}
				else if (vm.dir == 'Grade') {
					vm.dir = 'Semester  >  Course  >  Grade';
				}
			}
         	vm.dir = $state.current.name;
			vm.checkdir(vm.dir);
			vm.goHome = function() {
				//console.log('hi');
				$state.go('root.home');
			}

			vm.Logout = function () {
			        UserService.ClearCredentials();
			        $state.go('login');
			    }
		    }])

})()

