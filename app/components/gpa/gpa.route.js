(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', gpaRouter]);

		function gpaRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.GPA', {
					 url: '/gpa',
					 views: {
					 	'content@': {
						 	templateUrl: 'app/components/gpa/gpa.html',
							controller: 'gpaController',
							controllerAs: 'gpaVM'
						}
					}
				})
		}
})()