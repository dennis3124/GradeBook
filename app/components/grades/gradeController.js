(function(){
	angular.module('GradeBook')
		.controller('gradeController', ['$mdDialog', 'studentService', '$cookies' ,function($mdDialog,studentService, $cookies){
			var vm = this;
			vm.courseUniqueId = $cookies.get('courseUniqueId'); 
			vm.course = {};
			vm.section = {};
			//console.log(vm.courseUniqueId);
			studentService.getCourse(vm.courseUniqueId).then(function(data){
				vm.course = data.data;
				vm.course = vm.course[0];
			})
			studentService.getSection(vm.courseUniqueId).then(function(data){
				vm.section = data.data;
				//console.log(vm.section);
			})

			vm.openDialog = function(event) {
					var dialog = $mdDialog.show({
						targetEvent:event,
				 		clickOutsideToClose:true,
						templateUrl: 'app/components/grades/sectionDialog/sectionDialog.html',
						controller: 'sectionDialogController',
						locals: {
							courseUniqueId: vm.courseUniqueId
						},
						controllerAs: 'sectionDialogVM'
					}).then(function(){
						studentService.getSection(vm.courseUniqueId).then(function(data){
							vm.section = data.data;
							//console.log(vm.section);
						})
					})
			}
		}]);
})() 	
