(function(){
	angular.module('GradeBook')
		.controller('helpController', function(){
			var vm = this;
			  vm.isNavCollapsed = true;
  			  vm.isCollapsed = false;
  		      vm.isCollapsedHorizontal = false;
  		    vm.test = function() {
  		    	vm.isCollapsed = !vm.isCollapsed;
  		    	console.log(vm.isCollapsed)
  		    }
		});
})() 	
