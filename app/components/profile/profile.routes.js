(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', profileRouter]);

		function profileRouter($stateProvider,$urlRouterProvider) {
			var vm = this;

			$stateProvider
				.state('root.profile', {
					 url: '/profile',
					 views: {
					 	'content@': {
					 		templateUrl: 'app/components/profile/profile.html',					 
							controller: 'profileController',
					 		controllerAs: 'profileVM'
					 	}
					 }

				})
			
		}
})()