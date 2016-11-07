(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', calculatorDialogRouter]);

		function calculatorDialogRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.dialog', {
					 url: '/dialog',
					 views: {
					 	'content@': {
						 	templateUrl: 'app/components/calculator/dialog/dialog.html',
							controller: 'calculatorDialogController',
							controllerAs: 'calculatorDialogVM'
						}
					}
				})
		}
})()