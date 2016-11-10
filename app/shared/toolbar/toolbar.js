(function(){
	angular.module('GradeBook')

		.controller('toolBarController', ['$mdSidenav', '$state' ,'$rootScope' , function($mdSidenav,$state,$rootScope) {
			var vm = this;
			vm.openLeftSideNav = function(){
				$mdSidenav('left').toggle();
			};

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
					vm.dir = "Semester  >  Course \t>  Grade";
				}
			}
         	vm.dir = $state.current.name;
			vm.checkdir(vm.dir);
			vm.goHome = function() {
				//console.log('hi');
				$state.go('root.home');
			}
		}])

})()

