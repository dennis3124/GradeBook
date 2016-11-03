(function(){
	angular.module('GradeBook')
		.controller('gradeController', ['$mdDialog', 'studentService', '$cookies', '$state' ,function($mdDialog,studentService, $cookies, $state){
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
			})
				

		
			vm.deleteCourse = function() {
					for( var i = 0; i < vm.section.length; i++) {
							//console.log(vm.section[i]._id);
							vm.deleteGrades(vm.section[i]._id);

					}
					studentService.deleteCourse(vm.courseUniqueId).then(function(data) {
						for(var i = 0; i < vm.section.length; i++) {
							vm.deleteGrades(vm.section[i]._id);
							console.log(vm.section[i]._id);
						}
						console.log(data);
					})

					studentService.deleteSections(vm.courseUniqueId).then(function(data) {
						console.log(data);
					})
					$state.go('root.semester');
			}

			vm.deleteGrades = function(sectionid) {
				console.log(sectionid);
				 studentService.deleteGrades(sectionid).then(function(data) {
				 	console.log(sectionid);
				 })
			}

			vm.setGrades = function(sectionId,i){
				studentService.getGrade(sectionId).then(function(data){
						vm.section[i].grades = data.data;
						vm.section[i].total = 0;
						vm.section[i].totalReceived = 0;
						for(var j = 0; j < vm.section[i].grades.length; j++){
							vm.section[i].total += parseInt(vm.section[i].grades[j].totalGrade);
							vm.section[i].totalReceived += parseInt(vm.section[i].grades[j].grade);
						}
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
				studentService.getSection(vm.courseUniqueId).then(function(data){
					vm.section = data.data;
					//console.log(vm.section.length);
					for(var i = 0; i < vm.section.length; i++) {
						vm.section[i].showInput = false;
						 vm.setGrades(vm.section[i]._id,i);
					}
				})
				vm.newGrade = {};
			}

			vm.cancel = function(index) {
				vm.newGrade = {};
				vm.section[index].showInput = false;

			};

		}]);
})() 	
