(function(){
  angular.module('GradeBook')
  .controller('calculatorDialogController', ['$mdBottomSheet', '$mdDialog', 'studentService', '$cookies','$scope', function($mdBottomSheet, $mdDialog, studentService, $cookies, $scope){
    var vm = this;
      vm.courseUniqueId = $cookies.get('courseId');
      vm.semesterId = $cookies.get('semesterId');
      vm.semester = {};

      // Chart stuff
      $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

      $scope.labels = [];
      //$scope.data = [
      //  [65, -59, 80, 81, -56, 55, -40],
      //  [28, 48, -40, 19, 86, 27, 90]
      //];
      $scope.data = [[],[]]
      $scope.datasetOverride = [
        {
          label: "Bar chart",
          borderWidth: 1,
          type: 'bar'
        },
        {
          label: "Line chart",
          borderWidth: 3,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          type: 'line'
        }
      ];

      studentService.getCourse(vm.courseUniqueId).then(function(data){
        vm.course = data.data;
        vm.course = vm.course[0];
      })
      // Letter Grades
      vm.lettergrades = [
      "A",
      "B",
      "C",
      "D"
      ];
      vm.estimateGrade = {
      	percentage: 0
      };
      vm.gradeScale1 = [
      {
        letter: 'A+/A',
        score: '93-100'
      }, 
      {
        letter: 'A-',
        score: '90-92'
      },
      {
        letter: 'B+',
        score: '87-89'
      },
      {
        letter: 'B',
        score: '83-86'
      },
      ];
      vm.gradeScale2 = [
      {
        letter: 'B-',
        score: '80-82'
      },
      {
        letter: 'C+',
        score: '77-79'
      },
      {
        letter: 'C',
        score: '73-76'
      }, 
      {
        letter: 'C-',
        score: '70-72'
      }, 
      ];
      vm.gradeScale3 = [
      {
        letter: 'D+',
        score: '67-69'
      },
      {
        letter: 'D',
        score: '63-66'
      },
      {
        letter: 'D-',
        score: '60-62'
      },
      {
        letter: 'F',
        score: '0-59'
      },
      ]
      vm.estimate = 0;
      vm.lettergradescore = 0;
      vm.results = '';
      vm.percentResults = '';
      vm.test3 =  function(percentWanted, currentgrade, totalsection, percentage) {
       vm.lettergradescore2 = percentWanted;
        //vm.estimate = parseFloat((vm.lettergradescore - (currentgrade * (totalsection/100)))/(percentage/100)).toFixed(2);
        vm.estimate2 = parseFloat((vm.lettergradescore2 - (currentgrade/totalsection * totalsection))/percentage*100).toFixed(2);
        vm.maxPossibleScore2 = parseFloat((currentgrade/totalsection * totalsection) + (100 * percentage/100));
        //console.log(vm.maxPossibleScore);
            // console.log(percentage);
            // console.log(totalsection);
            vm.test2 = parseFloat(percentage) + parseFloat(totalsection);
            if (isNaN(vm.estimate2) | vm.lettergradescore2 === 0) {
              vm.percentResults = "Please choose a letter grade and type in the percentage of the finals.*"
            } else if (vm.test2 != 100) {
              vm.results2 = "Total percentage of section does not equal 100. Estimation not accurate. You will need at least " + vm.estimate2 + "% in your finals. Enter other sections to obtain a more accurate estimation or you may have a section that requires grade entry."
            } else if (vm.estimate2 > 100) {
              vm.percentResults = "Sorry! You will need at least " + vm.estimate2 + "% in your finals. Extra credit maybe? Maximum possible course grade obtained " + vm.maxPossibleScore2.toFixed(2) + "%";
            } else if (vm.estimate <= 100) {
              vm.percentResults = "You will need " + vm.estimate2 + "% in your finals to get a " + percentWanted;
            }
        //console.log(vm.results);
        //console.log(vm.estimate);      
      }
      vm.estimated = function(lettergrade, currentgrade, totalsection, percentage) {
      	//console.log(percentage);
      	if (lettergrade === "A"){
      		//console.log("95");
      		vm.lettergradescore = 95;
      		//console.log(vm.lettergradescore);
      	} else if (lettergrade === "B") {
      		//console.log("85");
      		vm.lettergradescore = 85;
      		console.log(vm.lettergradescore);
      	} else if (lettergrade === "C") {
      		//console.log("75");
      		vm.lettergradescore = 75;
      		console.log(vm.lettergradescore);
      	} else if (lettergrade === "D") {
      		//console.log("65");
      		vm.lettergradescore = 65;
      		console.log(vm.lettergradescore);
      	}

      	//vm.estimate = parseFloat((vm.lettergradescore - (currentgrade * (totalsection/100)))/(percentage/100)).toFixed(2);
      	vm.estimate = parseFloat((vm.lettergradescore - (currentgrade/totalsection * totalsection))/percentage*100).toFixed(2);
        vm.maxPossibleScore = parseFloat((currentgrade/totalsection * totalsection) + (100 * percentage/100));
      	//console.log(vm.maxPossibleScore);
        console.log(percentage);
        console.log(totalsection);
        vm.test = parseFloat(percentage) + parseFloat(totalsection);
        console.log(vm.test);
        if (isNaN(vm.estimate) | vm.lettergradescore === 0) {
          vm.results = "Please insert percentage wanted and type in the percentage of the finals.*"
        } else if (vm.test != 100) {
          vm.results = "Total percentage of section does not equal 100. Estimation not accurate. You will need at least " + vm.estimate + "% in your finals. Enter other sections to obtain a more accurate estimation or you may have a section that requires grade entry."
        } else if (vm.estimate > 100) {
          vm.results = "Sorry! You will need at least " + vm.estimate + "% in your finals. Extra credit maybe? Maximum possible course grade obtained " + vm.maxPossibleScore.toFixed(2) + "%";
        } else if (vm.estimate <= 100) {
          vm.results = "You will need " + vm.estimate + "% in your finals to get an " + lettergrade;
        }
      	//console.log(vm.results);
      	//console.log(vm.estimate);
      }
      vm.section = {};
      vm.totalSection = 0;

    
  studentService.getSection(vm.courseUniqueId).then(function(data){
    vm.section = data.data;

            for(var i = 0; i < vm.section.length; i++) {
              vm.section[i].showInput = false;
                  //$scope.data[i] = vm.section[i].weight;
                  //$scope.data[vm.section.length] += parseInt(vm.section[i].weight);
                  //console.log($scope.data[vm.section.length]);
                  vm.setGrades(vm.section[i]._id,i);
                }
            // calculate unaccounted weightage
            //$scope.labels[vm.section.length] = "Unaccounted/No Grades";
            //$scope.data[vm.section.length] = 100 - $scope.data[vm.section.length];

          })
      //console.log(vm.section);
	//console.log(vm.totalSection);
	vm.totalOverallReceived = 0;
	vm.totalOverall = 0;
	vm.calculated = 0;
	vm.actualPoints = 0;
	vm.estimatedLetterGrade = '';
	vm.setGrades = function(sectionId,i){
		//console.log(vm.section.length);
    studentService.getGrade(sectionId).then(function(data){
     vm.section[i].grades = data.data;
     vm.section[i].total = 0;
     vm.section[i].totalReceived = 0;
                  //svm.section
			//onsole.log(vm.section[i].grades.length);
            //console.log(vm.section.length);

           // console.log(vm.totalSection);
           if (vm.section[i].grades.length != 0) {
            for(var j = 0; j < vm.section[i].grades.length; j++){
              vm.section[i].total += parseInt(vm.section[i].grades[j].totalGrade);
              vm.section[i].totalReceived += parseInt(vm.section[i].grades[j].grade);
              $scope.labels[i] = vm.section[i].sectionName;
  
				//console.log(vm.section[i].total);
				//console.log(vm.section[i].totalReceived);
				//console.log(vm.section[i].weight);
				//vm.actualPoints += parseFloat(vm.section[i].totalReceived/vm.section[i].total*vm.section[i].weight);
				//console.log(vm.calculated);
				//console.log(vm.actualPoints);
				//vm.actualPoints = parseFloat(vm.actualPoints + vm.calculated).toFixed(2);
				//console.log(vm.actualPoints);
      }
                  $scope.data[0].push(vm.section[i].total);
              $scope.data[1].push(vm.section[i].totalReceived);
                  //console.log(vm.section[i].totalReceived);
                  //console.log(vm.section[i].total);
                  //console.log(vm.section[i].weight);
                  //for (var k = 0; k < vm.section.length; k++) {
                        //if (vm.section[i].grades.length != 0) {
                              //console.log(vm.section[k].weight);
                              vm.totalSection = vm.totalSection + parseInt(vm.section[i].weight);
                        //}
                  //}

			//for (var n = 0; n < vm.section[i].grades.length; n++) {

       vm.actualPoints += parseFloat(vm.section[i].totalReceived/vm.section[i].total*vm.section[i].weight);
			//}
			console.log(vm.actualPoints);
      if (isNaN(vm.actualPoints)) {
        vm.actualPoints = 0;
      }
      vm.calculated = parseFloat(vm.actualPoints).toFixed(2);
			//console.log(vm.calculated);	
			vm.totalOverallReceived += parseInt(vm.section[i].totalReceived);
			//console.log(vm.totalOverallReceived);
			vm.totalOverall += parseInt(vm.section[i].total);
			//vm.actualPoints = parseFloat(vm.totalOverallReceived/vm.totalOverall * vm.totalSection).toFixed(2);	
			//vm.actualPoints.round(2);
			vm.estimatedGrade = parseFloat(vm.actualPoints/vm.totalSection*100);
			vm.estimatedGrade = parseInt(vm.estimatedGrade);
			//console.log(vm.estimatedGrade);
   }
   vm.estimatedLetterGrade = "-";

   if (vm.estimatedGrade >= 98 & vm.estimatedGrade <= 100 ) {
    vm.estimatedLetterGrade = "A+";
  } else if (vm.estimatedGrade >= 93 & vm.estimatedGrade <= 97) {
    vm.estimatedLetterGrade = "A";
  } else if (vm.estimatedGrade >= 90 & vm.estimatedGrade <= 92) {
    vm.estimatedLetterGrade = "A-";
  } else if (vm.estimatedGrade >= 87 & vm.estimatedGrade <= 89) {
    vm.estimatedLetterGrade = "B+";
  } else if (vm.estimatedGrade >= 83 & vm.estimatedGrade <= 86) {
    vm.estimatedLetterGrade = "B";
  } else if (vm.estimatedGrade >= 80 & vm.estimatedGrade <= 82) {
    vm.estimatedLetterGrade = "B-";
  } else if (vm.estimatedGrade >= 77 & vm.estimatedGrade <= 79) {
    vm.estimatedLetterGrade = "C+";
  } else if (vm.estimatedGrade >= 73 & vm.estimaterGrade <= 76) {
    vm.estimatedLetterGrade = "C";
  } else if (vm.estimatedGrade >= 70 & vm.estimatedGrade <= 72) {
    vm.estimatedLetterGrade = "C-";
  } else if (vm.estimatedGrade >= 67 & vm.estimatedGrade <= 69) {
    vm.estimatedLetterGrade = "D+";
  } else if (vm.estimatedGrade >= 63 & vm.estimatedGrade <= 66) {
    vm.estimatedLetterGrade = "D";
  } else if (vm.estimatedGrade >= 60 & vm.estimatedGrade <= 62) {
    vm.estimatedLetterGrade = "D-";
  } else if (vm.estimatedGrade <= 59 & vm.estimatedGrade >= 0) {
				vm.estimatedLetterGrade = "F";
			}
		})
  }		


  studentService.getSemester(vm.semesterId).then(function(data) {
    vm.semester = data.data;
    vm.semester = vm.semester[0];
  });
}])
})()