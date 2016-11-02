(function(){
	angular.module('GradeBook')
		.controller('gpaDialogController', ['$mdDialog', 'studentService', function($mdDialog, studentService){
			var vm = this;
			vm.courses = [];
			vm.semester={};
			studentService.getCurrentSemester("0027756773").then(function(data) {
				vm.semester = data.data;
				vm.semester= vm.semester[0];
				vm.semesterId = vm.semester._id;
				console.log(vm.semester);
			studentService.getCourses(vm.semesterId).then(function(data) {
				vm.courses = data.data;
				//console.log(vm.courses);
			});
				//console.log(vm.semesterId);
			});
			
		}])

})()