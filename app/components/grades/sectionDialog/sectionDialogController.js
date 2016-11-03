(function(){
	angular.module('GradeBook')
		.controller('sectionDialogController', ['$mdDialog','studentService', 'courseUniqueId',function($mdDialog,studentService,courseUniqueId){
			var vm = this;
			vm.section = {name: '', weight: '', courseId: courseUniqueId};
			vm.flag = 0;
			vm.submitSection = function(){
				//console.log(vm.semester);
				if(vm.flag = 0) {
					studentService.postSection(vm.section).then(vm.flag = 1);
				};
				$mdDialog.hide();
			};
		}])

})()