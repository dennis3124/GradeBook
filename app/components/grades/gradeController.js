(function(){
	angular.module('GradeBook')
		.controller('gradeController', ['$mdDialog', 'studentService', '$cookies', '$state', '$timeout' ,function($mdDialog,studentService, $cookies, $state, $timeout){
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

					$timeout(function(){
						$state.reload('root');
						$state.go('root.course')
					}, 1000)
					
			}

			vm.deleteGrades = function(sectionid) {
				console.log(sectionid);
				 studentService.deleteGrades(sectionid).then(function(data) {
				 	console.log(sectionid);
				 })
			}
			vm.actualPercentage = 0;
			vm.setGrades = function(sectionId,i){
				studentService.getGrade(sectionId).then(function(data){
						vm.section[i].grades = data.data;
						vm.section[i].total = 0;
						vm.section[i].totalReceived = 0;
						for(var j = 0; j < vm.section[i].grades.length; j++){
							vm.section[i].total += parseInt(vm.section[i].grades[j].totalGrade);
							vm.section[i].totalReceived += parseInt(vm.section[i].grades[j].grade);
						}
						console.log(vm.section)
//						for(var i = 0; i < vm.section[i].grades.length; i++) {
//
						//}
						vm.actualPercentage += parseFloat((vm.section[i].totalReceived/vm.section[i].total)*vm.section[i].weight);
						//console.log(vm.actualPercentage);
						console.log("total actual percentage earned is "+vm.actualPercentage);
						if (vm.actualPercentage > 90) {
							console.log("A")
						}
						if (vm.actualPercentage > 80 && vm.actualPercentage < 90) {
							console.log("B")
						}
						if (vm.actualPercentage > 70 && vm.actualPercentage < 80) {
							console.log("C")
						}
						if (vm.actualPercentage > 60 && vm.actualPercentage < 70) {
							console.log("D")
						}
						if (vm.actualPercentage < 60) {
							console.log("F")
						}

						//if (vm.actualPercentage )
						 /*else if (actualPercentage >= 80 && <= 90) {
							console.log("B")
						} else if(actualPercentage >= 70 && < 80) {
							console.log("C")
						} */
						//console.log(vm.section[0].totalReceived)
						//console.log(vm.section[0].weight)
						//console.log(vm.section[1].total)
						//console.log(vm.section[1].totalReceived)
						//console.log(vm.section[1].weight)
						//for(var x = 0; x < vm.section[i].length; x++) {
                           //console.log("hello")
						//}
						//var sectionReceived = (vm.section[0].totalReceived/vm.section[0].total) * parseInt(vm.section[0].weight);
						//console.log(sectionReceived);

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
							for(var i = 0; i < vm.section.length; i++) {
								vm.section[i].showInput = false;
								vm.setGrades(vm.section[i]._id,i);
							}
							//console.log(vm.section);
						})
					})
			}
			vm.flag = 0;
			vm.submit = function(sectionObj, index) {
				//console.log(sectionObj);
				vm.newGrade.sectionId = sectionObj._id;
				if (vm.flag == 0) {
					studentService.postGrade(vm.newGrade).then(vm.flag = 1).then(function() {
						$timeout(function(){
							$state.reload('root');
						},1000);
					});
				};
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
				vm.flag = 0;
			}

			vm.cancel = function(index) {
				vm.newGrade = {};
				vm.section[index].showInput = false;

			};

		}]);
})() 	
