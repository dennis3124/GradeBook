(function(){
	angular.module('GradeBook')
		.controller('courseDialogController', ['$mdDialog', 'semesterId','studentService', function($mdDialog,semesterId,studentService){
			var vm = this;
			vm.course = {courseName:"", courseId:"",semesterId:semesterId}
			vm.submitCourse = function(){
				//console.log(vm.course);
				studentService.postCourse(vm.course);
				$mdDialog.hide();
			};
		}])

})()