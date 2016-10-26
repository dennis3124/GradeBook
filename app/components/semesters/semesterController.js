(function(){
	angular.module('GradeBook')
		.controller('semesterController', ['$mdDialog', 'studentService', '$state','$cookies' ,function($mdDialog,studentService,$state,$cookies){
			var vm = this;
			vm.semesters = [];
			vm.studentId = $cookies.get('studentId');
			studentService.getSemesters(vm.studentId).then(function(data) {
				vm.semesters = data.data;
				//console.log(vm.semesters);
			});

			vm.goToSemester = function(semesterId) {
				$cookies.put('semesterId', semesterId);
				$state.go('root.course');
			}

			vm.openDialog = function(event) {
					var dialog = $mdDialog.show({
						targetEvent:event,
				 		clickOutsideToClose:true,
						templateUrl: 'app/components/semesters/dialog/semesterDialog.html',
						controller: 'semesterDialogController',
						locals: {
							studentId: vm.studentId
						},
						controllerAs: 'semesterDialogVM'
					}).then(function(){
						studentService.getSemesters(vm.studentId).then(function(data) {
						vm.semesters = data.data;
						//console.log(vm.semesters);
						});
					})
			}

		}]);
})() 	
