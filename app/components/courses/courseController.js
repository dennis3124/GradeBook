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
				//console.log(vm.courses);
			});

			studentService.getSemester(vm.semesterId).then(function(data){
				vm.semester = data.data;
				vm.semester = vm.semester[0];
				//console.log(vm.semester);
			});

			// go to the grades for this course 
			vm.goToGrades = function(course) {
				$cookies.put('courseUniqueId',course._id);
				$state.go('root.grade');
			}

			vm.openDialog = function(event) {
					var dialog = $mdDialog.show({
						targetEvent:event,
				 		clickOutsideToClose:true,
						templateUrl: 'app/components/courses/dialog/courseDialog.html',
						controller: 'courseDialogController',
						locals: {
							semesterId: vm.semesterId
						},
						controllerAs: 'courseDialogVM'
					}).then(function(){
						studentService.getCourses(vm.semesterId).then(function(data) {
							vm.courses = data.data;
							//console.log(vm.courses);
						});
					})
			}

			vm.deleteSection = function() {
				
			}
		}]);
})() 	
