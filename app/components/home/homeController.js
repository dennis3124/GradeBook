(function(){
	angular.module('GradeBook')
		.controller('homeController', ['$mdDialog', 'studentService', '$http' ,function($mdDialog,studentService,$http){

			var vm = this;
			vm.students = [];
			vm.semesters = [];
			vm.courses = [];
			studentService.getStudents().then(function(data){
				//vm.semesters = data.data.semesters;
				//console.log(data.data);
			})

			studentService.getSemesters().then(function(data){
				vm.semesters = data.data;
				//console.log(vm.courses);
				
			})

			var student1 = {sem: ["Spring 2015", "Summer 2016", "Fall 2016"],
							name: "Dennis Chia",
							studentId: "00213334466"
		 				};
			var semester1 = {
				name: 'Spring',
				year: 2015,
				courses: ["CS250", "CS251", "CS252"]
			}

			vm.addItem = function() {
				studentService.postStudents(student1);
			};
			vm.addItem2 = function() {
				studentService.postSemesters(semester1);
			};


		}]);
		
		
})() 	
