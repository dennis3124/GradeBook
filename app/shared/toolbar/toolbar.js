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

		.controller('toolBarController', ['$mdSidenav' , function($mdSidenav) {
			var vm = this;
			vm.openLeftSideNav = function(){
				$mdSidenav('left').toggle();
			}
		}])

})()