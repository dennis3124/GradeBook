(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider',feedbackRouter]);

		function feedbackRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.feedback', {
					 url: '/feedback',
					 views: {
					 	'content@': {
					 		templateUrl: 'app/components/feedback/feedback.html',					 
							controller: 'feedbackController',
					 		controllerAs: 'feedbackVM'
					 	}
					 }
				})
			
		}
})()