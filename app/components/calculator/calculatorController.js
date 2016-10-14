(function(){
	angular.module('GradeBook')
		.controller('calculatorController', ['$mdDialog', 'studentService', function($mdDialog, studentService){
			var vm = this;
			vm.courses = [];
			vm.semester={};
			studentService.getCurrentSemester("0027756773").then(function(data) {
				vm.semester = data.data;
				vm.semester= vm.semester[0];
				vm.semesterId = vm.semester._id;
			studentService.getCourses(vm.semesterId).then(function(data) {
				vm.courses = data.data;
				console.log(vm.courses);
			});	
				console.log(vm.semesterId);
			});

			

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

			// go to the grades for this course 
			vm.goToGrades = function(course) {
				$cookies.put('courseUniqueId',course._id);
				$state.go('root.grade');
			}

		}])


})()

