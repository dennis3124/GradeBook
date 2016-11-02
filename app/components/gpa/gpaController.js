(function(){
	angular.module('GradeBook')
		.controller('gpaController', ['$mdDialog', 'studentService', '$cookies', function($mdDialog, studentService, $cookies){
			var vm = this;
			vm.semesters = [];
			vm.studentId = $cookies.get('studentId');
			studentService.getSemesters(vm.studentId).then(function(data) {
				vm.semesters = data.data;
				//console.log(vm.semesters);
			});


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

		}])



})()

