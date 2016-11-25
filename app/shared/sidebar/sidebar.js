(function(){
	angular.module('GradeBook')

		.controller('sideBarController',['UserService', '$state', '$mdSidenav', '$timeout' ,function(UserService, $state,$mdSidenav,$timeout){
			var vm = this;
			vm.home = $state.is('root.home');
			vm.semester = $state.is('root.semester');
			vm.calculator = $state.is('root.calculator');
			vm.gpa = $state.is('root.GPA');
			vm.help = $state.is('root.help');
			vm.goToSem = function() {
				$state.reload('root');	
				$timeout(function() {			
					$state.go('root.semester')
				}, 50)
				$mdSidenav('left').toggle();
			};

			vm.goToHome = function() {
				$state.reload('root');				
				$timeout(function() {
					$state.go('root.home')
				},50) 
				$mdSidenav('left').toggle();
			};
			vm.goToCalc = function() {
				$state.reload('root');				
				$timeout(function() {
					$state.go('root.calculator')
				}, 50)
				$mdSidenav('left').toggle();

			};
			vm.goToGpa = function() {
				$state.reload('root');				
				$timeout(function() {
					$state.go('root.GPA');
				}, 50)
				$mdSidenav('left').toggle();
			}
			vm.goToHelp = function() {
				$state.reload('root');
				$timeout(function() {
					$state.go('root.help');
				}, 50)
				$mdSidenav('left').toggle();
			}

			vm.Logout = function () {
			    UserService.ClearCredentials();
			    $state.go('login');
			}
	
		}])

})()