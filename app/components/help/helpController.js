(function(){
	angular.module('GradeBook')
		.controller('helpController', ['$mdDialog', 'studentService', '$state','$cookies' ,function($scope){
			  $scope.isNavCollapsed = true;
  			  $scope.isCollapsed = false;
  		      $scope.isCollapsedHorizontal = false;
		}]);
})() 	
