(function(){
	angular.module('GradeBook', ['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'app/components/home/home.html',
					controller: 'homeController',
					controllerAs: 'homeVM'
				})

			$urlRouterProvider.otherwise('/home')
		})

})()