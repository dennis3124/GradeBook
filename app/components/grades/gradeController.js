(function(){
	angular.module('GradeBook')
		.controller('semesterController', ['$mdDialog', 'studentService' ,function($mdDialog,studentService){
			var vm = this;

			vm.semesters = [];
			studentService.getSemesters("0024466").then(function(data) {
				vm.semesters = data.data;
				console.log(vm.semesters);
			})
		}]);
})() 	
