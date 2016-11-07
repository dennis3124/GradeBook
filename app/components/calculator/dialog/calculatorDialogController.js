(function(){
  angular.module('GradeBook')
    .controller('calculatorDialogController', ['$mdDialog', 'studentService', '$cookies', '$scope', function($mdDialog, studentService, $cookies, $scope){
      var vm = this;
      //console.log(2);
      vm.courseUniqueId = $cookies.get('courseId');
      vm.semesterId = $cookies.get('semesterId');
      //vm.courseUniqueId = $cookies.get('courseUniqueId');
      //console.log(vm.courseUniqueId);
      vm.semester = {};
      studentService.getCourse(vm.courseUniqueId).then(function(data){
		vm.course = data.data;
		vm.course = vm.course[0];
	  })

      vm.section = {};
      vm.totalSection = 0;
	  studentService.getSection(vm.courseUniqueId).then(function(data){
	  	vm.section = data.data;
		//console.log(vm.section);
		for(var i = 0; i < vm.section.length; i++) {
			vm.section[i].showInput = false;
			vm.setGrades(vm.section[i]._id,i);
		}
		for (var i = 0; i < vm.section.length; i++) {
			vm.totalSection = vm.totalSection + parseInt(vm.section[i].weight);
		}
	  })

	//console.log(vm.section);

	//console.log(vm.totalSection);
	vm.totalOverallReceived = 0;
	vm.totalOverall = 0;
	vm.calculated = 0;
	vm.actualPoints = 0;
	vm.setGrades = function(sectionId,i){
		studentService.getGrade(sectionId).then(function(data){
			vm.section[i].grades = data.data;
			vm.section[i].total = 0;
			vm.section[i].totalReceived = 0;
			for(var j = 0; j < vm.section[i].grades.length; j++){
				vm.section[i].total += parseInt(vm.section[i].grades[j].totalGrade);
				vm.section[i].totalReceived += parseInt(vm.section[i].grades[j].grade);
				//console.log(vm.section[i].total);
				//console.log(vm.section[i].totalReceived);
				//console.log(vm.section[i].weight);
				vm.actualPoints += parseFloat(vm.section[i].totalReceived/vm.section[i].total*vm.section[i].weight);
				//console.log(vm.calculated);
				//console.log(vm.actualPoints);
				//vm.actualPoints = parseFloat(vm.actualPoints + vm.calculated).toFixed(2);
				console.log(vm.actualPoints);
			}
			console.log(vm.actualPoints);
			vm.calculated = parseFloat(vm.actualPoints).toFixed(2);
			console.log(vm.calculated);	
			vm.totalOverallReceived += parseInt(vm.section[i].totalReceived);
			//console.log(vm.totalOverallReceived);
			vm.totalOverall += parseInt(vm.section[i].total);
			//console.log(vm.totalOverall);
			//vm.actualPoints = parseFloat(vm.totalOverallReceived/vm.totalOverall * vm.totalSection).toFixed(2);	
			//vm.actualPoints.round(2);
		})
				
	}			
	//studentService.getSection(vm.courseUniqueId);
	//console.log(vm.totalOverallReceived);
	//console.log(vm.totalOverall);
	//console.log(vm.totalSection);
	
      studentService.getSemester(vm.semesterId).then(function(data) {
      	vm.semester = data.data;
      	vm.semester = vm.semester[0];
      });
    }])

})()