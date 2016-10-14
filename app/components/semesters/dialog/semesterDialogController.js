(function(){
	angular.module('GradeBook')
		.controller('semesterDialogController', ['$mdDialog', 'studentId','studentService', function($mdDialog,studentId,studentService){
			var vm = this;
			vm.semester= {name:"",year:"",studentId:studentId,currentSemester:""};
			vm.submitSemester = function(){
				//console.log(vm.semester);
				studentService.postSemesters(vm.semester);
				$mdDialog.hide();
			};
		}])

})()