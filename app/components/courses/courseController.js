(function(){
	angular.module('GradeBook')
		.controller('courseController', ['$mdDialog', 'studentService','$cookies', '$state' ,function($mdDialog,studentService,$cookies,$state){
			var vm = this;
			vm.courses = [];
			vm.semesterId = $cookies.get('semesterId');
			vm.semester={};
			//get the courses for this semester
			studentService.getCourses(vm.semesterId).then(function(data) {
				vm.courses = data.data;
				console.log(vm.courses);
			});

			studentService.getSemester(vm.semesterId).then(function(data){
				vm.semester = data.data;
				vm.semester = vm.semester[0];
				//console.log(vm.semester);
			});

			// go to the grades for this course 
			vm.goToGrades = function(courseName) {
				//console.log('test');
				$cookies.put('course', courseName);
				$state.go('root.grade');
			}

			vm.openDialog = function(event) {
					var dialog = $mdDialog.show({
						targetEvent:event,
				 		clickOutsideToClose:true,
						templateUrl: 'app/components/courses/dialog/courseDialog.html',
						controller: 'courseDialogController',
						controllerAs: 'courseDialogVM'
					}).then(function(data){
						vm.newCourse = {courseName:data.courseName,semesterId:vm.semesterId,courseId:data.courseID};
						studentService.postCourse(vm.newCourse);
					})
			}
		}]);
})() 	
