(function(){
	angular.module('GradeBook')
		.directive('sideBar', function(){
			return {
				restrict:'E',
				templateUrl:'app/shared/sidebar/sidebar.html',
				controller:'sideBarController',
				controllerAs:'sideVm'
			}
		})

		.controller('sideBarController',function(){
			
		})

})()