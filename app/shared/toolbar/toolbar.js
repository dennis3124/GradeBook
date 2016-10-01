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

		.controller('toolBarController', ['$mdSidenav', '$state' , function($mdSidenav,$state) {
			var vm = this;
			vm.openLeftSideNav = function(){
				$mdSidenav('left').toggle();
			};

			vm.goHome = function() {
				//console.log('hi');
				$state.go('root.home');
			}
		}])

})()