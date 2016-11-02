(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', gpaDialogRouter]);

		function gpaDialogRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.gpaDialog', {
					 url: '/gpaDialog',
					 views: {
					 	'content@': {
						 	templateUrl: 'app/components/gpa/dialog/gpaDialog.html',
							controller: 'gpaDialogController',
							controllerAs: 'gpaDialogVM'
						}
					}
				})
		}
})()