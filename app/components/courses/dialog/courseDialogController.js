(function(){
	angular.module('GradeBook')
		.controller('courseDialogController', ['$mdDialog', function($mdDialog){
			var vm = this;
			vm.course = {courseName:"", courseID:""}
			vm.submitCourse = function(){
				//console.log('hi');
				$mdDialog.hide(vm.course);
			};
		}])

})()