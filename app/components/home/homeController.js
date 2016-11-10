(function(){
	angular.module('GradeBook')
		.controller('homeController', ['$mdDialog', 'studentService', 'UserService', '$cookies', '$state', '$rootScope',
            function ($mdDialog, studentService, UserService,$cookies, $state, $rootScope) {

			var vm = this;
			vm.students = $rootScope.globals.currentUser;
			console.log(vm.students);
			vm.semesters = [];
			vm.currentSemester ={};
			vm.courses = [];
			vm.semesterId;
			vm.totalCreditHours= 0;
			vm.requireAttention = 0;
			vm.attentionCourse = [];
			vm.fliiped = false;

			//THIS IS HARDCODED TO TEST 
			$cookies.put('studentId', $rootScope.globals.currentUser.username);


			UserService.GetById($rootScope.globals.currentUser.username).then(function(data) {
				$rootScope.globals.studentName = data.data[0].name;
				vm.students.name = data.data[0].name;

			})

			studentService.getCurrentSemester($rootScope.globals.currentUser.username).then(function(data){
				vm.currentSemester = data.data;
				vm.currentSemester= vm.currentSemester[0];
				//console.log(vm.currentSemester);
				vm.semesterId = vm.currentSemester._id;
				//console.log(vm.semesterId);

			}).then(function(data) {
				studentService.getCourses(vm.semesterId).then(function(data) {
					vm.courses = data.data;
					for(var i = 0; i < vm.courses.length; i++) {
						vm.totalCreditHours+=parseInt(vm.courses[i].creditHours);
						if(vm.courses[i].letterGrade!= 'A' && vm.courses[i].letterGrade!= 'B' && vm.courses[i].letterGrade!= 'C' 
							&& vm.courses[i].letterGrade!= 'D' ) {
							vm.attentionCourse[vm.requireAttention] = vm.courses[i];
							vm.requireAttention++;
						}
					}
					//console.log(vm.attentionCourse);
				})
			})


			vm.goToGrades = function(course) {
				$cookies.put('courseUniqueId',course._id);
				$state.go('root.grade');
			}

		}]);
		
		
})() 	
