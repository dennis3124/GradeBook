(function(){
	angular.module('GradeBook')
		// .directive('sideBar', function(){
		// 	return {
		// 		restrict:'E',
		// 		templateUrl:'app/shared/sidebar/sidebar.html',
		// 		controller:'sideBarController',
		// 		controllerAs:'sideVm'
		// 	}
		// })

		.controller('sideBarController',['$state', '$mdSidenav' ,function($state,$mdSidenav){
			var vm = this;
			vm.home = $state.is('root.home');
			vm.semester = $state.is('root.semester');
			vm.calculator = $state.is('root.calculator');
			vm.gpa = $state.is('root.gpa');
			vm.goToSem = function() {
				$state.go('root.semester');
				$mdSidenav('left').toggle();
			};

			vm.goToHome = function() {
				$state.go('root.home')
				$mdSidenav('left').toggle();
			};
			vm.goToCalc = function() {
				$state.go('root.calculator')
				$mdSidenav('left').toggle();

			};
			vm.goToGpa = function() {
				$state.go('root.gpa')
				$mdSidenav('left').toggle();
			}
	
		}])

})()