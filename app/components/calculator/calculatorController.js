(function(){
	angular.module('GradeBook')
		.controller('calculatorController', ['$mdDialog', function($mdDialog){
			var vm = this;
			vm.calculated = function() {
				for (var i = 1; i < 2; i++) {
					alert("Hello")
				}
			}
			
		 	vm.showAdvanced = function(ev) {
			    $mdDialog.show({
			      //controller: calculatorDialogController,
			      //controllerAs: calculatorDialogVM,
			      templateUrl: 'app/components/calculator/dialog/dialog.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
			    })
			  };
		}])


})()

