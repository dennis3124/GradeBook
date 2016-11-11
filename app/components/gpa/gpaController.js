(function(){
	angular.module('GradeBook')
		.controller('gpaController', ['$mdDialog', 'studentService', '$cookies', function($mdDialog, studentService, $cookies){
			var vm = this;
			vm.semesters = [];
			vm.gpa = [];
			vm.index = 0;
			vm.studentId = $cookies.get('studentId');
			studentService.getSemesters(vm.studentId).then(function(data) {
				vm.semesters = data.data;
				for (var i = 0; i < vm.semesters.length; i++) {
					studentService.getCourses(vm.semesters[i]._id).then(function(data) {
					//vm.semesters[i].courses = data.data;
					// /var gpaArray[vm.semesters.length]
					vm.getGPA(data.data, i);
					// console.log(data.data);
					})
				}
				// console.log(vm.semesters);
			});

			console.log(vm.gpa);


			vm.showAdvanced = function(ev, semester) {
			    $mdDialog.show({
			      controller: "gpaDialogController",
			      controllerAs: "gpaDialogVM",
			      templateUrl: 'app/components/gpa/dialog/gpaDialog.html',
			      parent: angular.element(document.body),
			      locals: {
			      		semester: semester
			      },
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
			    })
			  };

			vm.getGPA = function(courses, i) {
				var sum = 0;
				var creditHours = 0;
				for (var j = 0; j < courses.length; j++) {
					var grade = courses[j].letterGrade;
					var weight;
					if (grade == "A+") {weight = 4}
					else if (grade == "A") {weight = 4}
					else if (grade == "A-") {weight = 3.7}
					else if (grade == "B+") {weight = 3.3}
					else if (grade == "B") {weight = 3}
					else if (grade == "B-") {weight = 2.7}
					else if (grade == "C+") {weight = 2.3}
					else if (grade == "C") {weight = 2}
					else if (grade == "C-") {weight = 1.7}
					else if (grade == "D+") {weight = 1.3}
					else if (grade == "D") {weight = 1}
					else if (grade == "D-") {weight = 0.7}
					else {grade = 0}
					sum += courses[j].creditHours * weight;
					creditHours += parseInt(courses[j].creditHours);
				}
				var gpa = sum / creditHours;
				vm.gpa[vm.index++]= gpa;
				console.log(gpa);
				console.log(sum);
				console.log(creditHours);
				//vm.semesters[j].gpa = gpa;
				console.log(vm.semesters);
				console.log(i);
			}

		}])



})()

