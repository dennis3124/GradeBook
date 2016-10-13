(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', homeRouter]);

		function homeRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.home', {
					 url: '/home',
					 views: {
					 	'content@': {
					 		templateUrl: 'app/components/home/home.html',					 
							controller: 'homeController',
					 		controllerAs: 'homeVM'
					 	}
					 }
				})
			
		}
})()