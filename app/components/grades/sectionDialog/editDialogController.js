(function(){
	angular.module('GradeBook')
		.controller('editDialogController', ['$mdDialog','studentService', 'courseUniqueId', '$timeout' ,function($mdDialog,studentService,courseUniqueId, $timeout){
			var vm = this;
			studentService.getSection(courseUniqueId).then(function(data) {
				vm.sections = data.data;
				console.log(vm.sections)
			})
			vm.submitSection = function(){
				//console.log(vm.semester);
					studentService.postSection(vm.section)
				$mdDialog.hide();
				
			};
		}])

})()