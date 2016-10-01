(function(){
	angular.module('home', ['ui.router'])
		.config(['$stateProvider','$urlRouterProvider', homeRouter]);

		function homeRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.home', {
					 url: '/home',
					 templateUrl: 'app/components/home/home.html',
					 controller: 'homeController',
					 controllerAs: 'homeVM'
				})
			$urlRouterProvider.otherwise('/home');
		}
})()