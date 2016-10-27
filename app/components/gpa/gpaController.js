(function(){
	angular.module('GradeBook')
		.controller('gpaController', ['$mdDialog', 'studentService', '$cookies', function($mdDialog, studentService, $cookies){
			var vm = this;
			vm.semesters = [];
			vm.studentId = $cookies.get('studentId');
			studentService.getSemesters(vm.studentId).then(function(data) {
				vm.semesters = data.data;
				console.log(vm.semesters);
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

		}])



})()

