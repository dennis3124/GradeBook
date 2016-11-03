(function(){
	angular.module('GradeBook')
		.controller('courseDialogController', ['$mdDialog', 'semesterId','studentService', function($mdDialog,semesterId,studentService){
			var vm = this;
			vm.course = {courseName:"", courseId:"",semesterId:semesterId,creditHours:""}
			vm.hours = [0,1,2,3,4,5,6];
			vm.flag = 0;
			vm.submitCourse = function(){
				//console.log(vm.course);
				if (vm.flag == 0) {
					studentService.postCourse(vm.course).then(vm.flag = 1);
				}
				$mdDialog.hide();
			};
		}])

})()