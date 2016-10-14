(function(){
	angular.module('GradeBook')
		.controller('calculatorController', ['$mdDialog', function($mdDialog){
			var vm = this;
			vm.calculated = function() {
				for (var i = 1; i < 2; i++) {
					alert("Hello")
				}
			}

		}]);

})()

