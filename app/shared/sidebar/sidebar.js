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

		.controller('sideBarController',['$state',function($state){
			var vm = this;
			vm.goToSem = function() {
				$state.go('root.semester')
			};
			vm.goToHome = function() {
				$state.go('root.home')
			}
			vm.goToCalc = function() {
				$state.go('root.calculator')
			}
		}])

})()