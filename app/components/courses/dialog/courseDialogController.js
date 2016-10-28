(function(){
	angular.module('GradeBook')
		.controller('courseDialogController', ['$mdDialog', 'semesterId','studentService', function($mdDialog,semesterId,studentService){
			var vm = this;
			vm.course = {courseName:"", courseId:"",semesterId:semesterId,creditHours:""}
			vm.hours = [0,1,2,3,4,5,6];
			vm.submitCourse = function(){
				//console.log(vm.course);
				studentService.postCourse(vm.course);
				$mdDialog.hide();
			};
		}])

})()