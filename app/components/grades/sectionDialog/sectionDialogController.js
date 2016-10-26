(function(){
	angular.module('GradeBook')
		.controller('sectionDialogController', ['$mdDialog','studentService', 'courseUniqueId',function($mdDialog,studentService,courseUniqueId){
			var vm = this;
			vm.section = {name: '', weight: '', courseId: courseUniqueId};
			vm.submitSection = function(){
				//console.log(vm.semester);
				studentService.postSection(vm.section);
				$mdDialog.hide();
			};
		}])

})()