(function(){
	angular.module('GradeBook')
		.controller('calculatorDialogController', ['$mdDialog', function($mdDialog){
			var vm = this;
			vm.close = function() {
				$mdDialog.hide()
			}
		}]);

})()