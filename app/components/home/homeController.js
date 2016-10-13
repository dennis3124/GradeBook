(function(){
	angular.module('GradeBook')
		.controller('homeController', ['$mdDialog', 'studentService', '$cookies' ,function($mdDialog,studentService,$cookies){

			var vm = this;
			vm.students = [];
			vm.semesters = [];
			vm.currentSemester ={};
			vm.courses = [];
			studentService.getStudents().then(function(data){
				//vm.semesters = data.data.semesters;
				//console.log(data.data);
			})

			studentService.getCurrentSemester("0024466").then(function(data){
				vm.currentSemester = data.data;
				vm.currentSemester= vm.currentSemester[0];
				console.log(vm.currentSemester);
				
			})

			var student1 = {sem: ["Spring 2015", "Summer 2016", "Fall 2016"],
							name: "Dennis Chia",
							studentId: "00213334466"
		 				};
			var semester1 = {
				currentSemester: true,
				studentId: "0024466",
				name: 'Fall',
				year: 2016,
				courses: ["CS250", "CS251", "CS252"]
			}

			vm.addItem = function() {
				studentService.postStudents(student1);
			};
			vm.addItem2 = function() {
				studentService.postSemesters(semester1);
			};
			vm.goToGrades = function(courseName) {
				$cookies.put('course', courseName);
				$state.go('root.grade');
			}

		}]);
		
		
})() 	
