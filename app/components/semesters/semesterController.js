(function(){
	angular.module('GradeBook')
		.controller('semesterController', ['$mdDialog', 'studentService', '$state','$cookies','$window', '$rootScope' ,function($mdDialog,studentService,$state,$cookies,$window,$rootScope){
			var vm = this;
			vm.semesters = [];
			vm.currentSemester = {};
			vm.studentId = $cookies.get('studentId');
			studentService.getSemesters(vm.studentId).then(function(data) {
				vm.semesters = data.data;
				for (var i = 0; i < vm.semesters.length; i++) {
					if(vm.semesters[i].name.toUpperCase()=='SPRING') {
						vm.semesters[i].color = 'spring'
					}
					else if(vm.semesters[i].name.toUpperCase()=='SUMMER') {
						vm.semesters[i].color = 'summer'
					}
					else if(vm.semesters[i].name.toUpperCase()=='WINTER') {
						vm.semesters[i].color = 'winter'
					}
					
				}
			});

			studentService.getCurrentSemester($rootScope.globals.currentUser.username).then(function(data) {
				vm.currentSemester = data.data[0];
				console.log(vm.currentSemester);
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
						$window.location.reload();
					})
			}

		}]);
})()