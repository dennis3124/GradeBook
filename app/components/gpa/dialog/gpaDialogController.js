(function(){
	angular.module('GradeBook')
		.controller('gpaDialogController', ['$mdDialog', 'studentService', 'semester', function($mdDialog, studentService, semester){
			var vm = this;
			vm.courses = [];
			vm.semester= semester;
			studentService.getCourses(vm.semester._id).then(function(data) {
				vm.courses = data.data;
				console.log(vm.courses);
			});
				//console.log(vm.semesterId);

		}])

})()