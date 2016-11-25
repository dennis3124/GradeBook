(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider',helpRouter]);

		function helpRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.help', {
					 url: '/help',
					 views: {
					 	'content@': {
					 		templateUrl: 'app/components/help/help.html',					 
							controller: 'helpController',
					 		controllerAs: 'helpVM'
					 	}
					 }
				})
			
		}
})()