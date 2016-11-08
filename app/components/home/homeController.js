(function(){
	angular.module('GradeBook')
		.controller('homeController', ['$mdDialog', 'studentService', 'UserService', '$cookies', '$state', '$rootScope',
            function ($mdDialog, studentService, UserService,$cookies, $state, $rootScope) {

			var vm = this;
			vm.students = [];
			vm.semesters = [];
			vm.currentSemester ={};
			vm.courses = [];
			vm.semesterId;

			//THIS IS HARDCODED TO TEST 
			//$cookies.put('studentId',"0027756773");

			studentService.getCurrentSemester($rootScope.globals.currentUser.username).then(function(data){
				vm.currentSemester = data.data;
				vm.currentSemester= vm.currentSemester[0];
				//console.log(vm.currentSemester);
				vm.semesterId = vm.currentSemester._id;
				//console.log(vm.semesterId);

			}).then(function(data) {
				studentService.getCourses(vm.semesterId).then(function(data) {
					vm.courses = data.data;
					//console.log(vm.courses);
				})
			})


			vm.goToGrades = function(courseName) {
				$cookies.put('course', courseName);
				$state.go('root.grade');
			}

		}]);
		
		
})() 	
