(function(){
	angular.module('GradeBook')
		.controller('gradeController', ['$mdDialog', 'studentService', '$cookies' ,function($mdDialog,studentService, $cookies){
			var vm = this;

			vm.courseName = $cookies.get('course')
		}]);
})() 	
