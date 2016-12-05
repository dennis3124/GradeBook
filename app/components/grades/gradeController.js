(function(){
	angular.module('GradeBook')
		.controller('gradeController', ['$mdDialog', 'studentService', '$cookies', '$state', '$timeout' ,function($mdDialog,studentService, $cookies, $state, $timeout){
			var vm = this;
			vm.courseUniqueId = $cookies.get('courseUniqueId'); 
			vm.course = {};
			vm.section = {};
			vm.showInput = false;
			vm.totalWeight = 0;
			//console.log(vm.courseUniqueId);
			


			studentService.getCourse(vm.courseUniqueId).then(function(data){
				vm.course = data.data;
				vm.course = vm.course[0];
			})
			studentService.getSection(vm.courseUniqueId).then(function(data){
				vm.section = data.data;
				//console.log(vm.section.length);
				// console.log(vm.totalWeight);
				for(var k = 0; k < vm.section.length; k++) {
								vm.totalWeight+= parseInt(vm.section[k].weight);
				}
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
			vm.deleteGrade = function(gradeId) {
				//console.log(gradeId);
				studentService.deleteGrade(gradeId).then(function(data) {
					studentService.getSection(vm.courseUniqueId).then(function(data){
					vm.section = data.data;
					//console.log(vm.section.length);
					for(var i = 0; i < vm.section.length; i++) {
						vm.section[i].showInput = false;
						 vm.setGrades(vm.section[i]._id,i);
					}
				}).then(function() {
					vm.course.letterGrade = vm.actualGrade;
					studentService.updateCourse(vm.course);
				});
				})
			}

			vm.deleteGrades = function(sectionid) {
				console.log(sectionid);
				 studentService.deleteGrades(sectionid).then(function(data) {
				 }).then(function() {

				 })
			}
			vm.actualPercentage = 0;
			vm.actualGrade = 0;
			vm.totalSection = 0;
			vm.calculated = 0;
			vm.totalOverallReceived = 0;
			vm.totalOverall = 0;
			vm.actualPoints = 0;
			vm.setGrades = function(sectionId,i){
				studentService.getGrade(sectionId).then(function(data){
						vm.section[i].grades = data.data;
						vm.section[i].total = 0;
						vm.section[i].totalReceived = 0;
						if (vm.section[i].grades.length != 0) {
						for(var j = 0; j < vm.section[i].grades.length; j++){
							vm.section[i].total += parseInt(vm.section[i].grades[j].totalGrade);
							vm.section[i].totalReceived += parseInt(vm.section[i].grades[j].grade);
						} 
					
						vm.totalSection = vm.totalSection + parseInt(vm.section[i].weight);
						vm.actualPoints += parseFloat(vm.section[i].totalReceived/vm.section[i].total * vm.section[i].weight);
						console.log(vm.actualPoints);
						if (isNaN(vm.actualPoints)) {
							vm.actualPoints = 0;
						}
						vm.calculated = parseFloat(vm.actualPoints).toFixed(2);
						vm.totalOverallReceived += parseInt(vm.section[i].totalReceived);
						vm.totalOverall += parseInt(vm.section[i].total);
						vm.actualPercentage = parseFloat(vm.actualPoints/vm.totalSection*100);
						vm.actualPercentage = parseInt(vm.actualPercentage);
						 //console.log(vm.actualPercentage);
						 }
						 console.log("total actual percentage earned is "+vm.actualPercentage);
						if (vm.actualPercentage >= 98 && vm.actualPercentage <= 100) {
								// console.log("A+")
							vm.actualGrade = "A+";
						}
						if (vm.actualPercentage >= 93 && vm.actualPercentage <= 97) {
								// console.log("A")
							vm.actualGrade = "A";
						}
						if (vm.actualPercentage >= 90 && vm.actualPercentage < 93) {
								// console.log("A-")
							vm.actualGrade = "A-";
						}
						if (vm.actualPercentage >= 87 && vm.actualPercentage < 90) {
								// console.log("B+")
							vm.actualGrade = "B+";
						}
						if (vm.actualPercentage >= 83 && vm.actualPercentage < 87) {
								// console.log("B")
							vm.actualGrade = "B";
						}
						if (vm.actualPercentage >= 80 && vm.actualPercentage < 83) {
								// console.log("B-")
							vm.actualGrade = "B-";
						}
						if (vm.actualPercentage >= 77 && vm.actualPercentage < 80) {
								// console.log("C+")
							vm.actualGrade = "C+";
						}
						if (vm.actualPercentage >= 73 && vm.actualPercentage < 77) {
								// console.log("C")
							vm.actualGrade = "C";
						}
						if (vm.actualPercentage >= 70 && vm.actualPercentage < 73) {
								// console.log("C-")
						}
						if (vm.actualPercentage >= 67 && vm.actualPercentage < 70) {
								// console.log("D+")
							vm.actualGrade = "D+";
						}
						if (vm.actualPercentage >= 63 && vm.actualPercentage < 67) {
								// console.log("D")
							vm.actualGrade = "D";
						}
						if (vm.actualPercentage >= 60 && vm.actualPercentage < 63) {
								// console.log("D-")
							vm.actualGrade = "D-";
						}
						if (vm.actualPercentage < 60) {
								// console.log("F")
							vm.actualGrade = "F"
						}
						vm.course.letterGrade = vm.actualGrade;
						studentService.updateCourse(vm.course);

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
			vm.submit = function(sectionObj, index) {
				//console.log(sectionObj);
					//console.log(sectionObj);
				vm.newGrade.sectionId = sectionObj._id;
				
				studentService.postGrade(vm.newGrade).then(function() {
						$timeout(function(){
							$state.reload('root');
						},1000);
				});
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


			vm.submitEdit = function (grade) {
				studentService.updateGrade(grade).then(function() {
						$timeout(function() {
								studentService.getSection(vm.courseUniqueId).then(function(data){
								vm.section = data.data;
								//console.log(vm.section.length);
								for(var i = 0; i < vm.section.length; i++) {
										vm.section[i].showInput = false;
										 vm.setGrades(vm.section[i]._id,i);
								}
						})	
						},500)		
				});
				grade.showInput = false;
				$timeout(function(){
						$state.reload('root');

				},500);
				console.log(vm.course);

			}


			vm.editGrade = function(grade) {
				grade.showInput = true;
				grade.grade = parseInt(grade.grade);
				grade.totalGrade= parseInt(grade.totalGrade)

			}
			vm.cancel = function(index) {
				vm.newGrade = {};
				vm.section[index].showInput = false;

			};

		}]);
})() 	
