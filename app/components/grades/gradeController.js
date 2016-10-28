(function(){
	angular.module('GradeBook')
		.controller('gradeController', ['$mdDialog', 'studentService', '$cookies' ,function($mdDialog,studentService, $cookies){
			var vm = this;
			vm.courseUniqueId = $cookies.get('courseUniqueId'); 
			vm.course = {};
			vm.section = {};
			vm.showInput = false;
			//console.log(vm.courseUniqueId);



			studentService.getCourse(vm.courseUniqueId).then(function(data){
				vm.course = data.data;
				vm.course = vm.course[0];
			})
			studentService.getSection(vm.courseUniqueId).then(function(data){
				vm.section = data.data;
				//console.log(vm.section.length);
				for(var i = 0; i < vm.section.length; i++) {
					vm.section[i].showInput = false;
					 vm.setGrades(vm.section[i]._id,i);
				}
				//console.log(vm.section);
			}).then(function(){
				console.log(vm.section);
			})
				
		
			vm.setGrades = function(sectionId,i){
				studentService.getGrade(sectionId).then(function(data){
						vm.section[i].grades = data.data;
				})
				
			}
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

			vm.submit = function(sectionObj, index) {
				//console.log(sectionObj);
				vm.newGrade.sectionId = sectionObj._id;
				studentService.postGrade(vm.newGrade);
				vm.section[index].showInput = false;

			}

			vm.cancel = function(index) {
				vm.newGrade = {};
				vm.section[index].showInput = false;

			}

		}]);
})() 	
