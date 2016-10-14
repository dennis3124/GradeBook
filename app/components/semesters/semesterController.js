(function(){
	angular.module('GradeBook')
		.controller('semesterController', ['$mdDialog', 'studentService', '$state','$cookies' ,function($mdDialog,studentService,$state,$cookies){
			var vm = this;
			vm.semesters = [];
			studentService.getSemesters("0027756773").then(function(data) {
				vm.semesters = data.data;
				//console.log(vm.semesters);
			});

			vm.goToSemester = function(semesterId) {
				$cookies.put('semesterId', semesterId);
				$state.go('root.course');
			}

		}]);
})() 	
