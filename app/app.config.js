 (function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', routeAppConfig]);

		function routeAppConfig ($stateProvider,$urlRouterProvider){
		$stateProvider
				.state('root', {
					url: '',
					views: {
						'toolbar': {
							templateUrl:'app/shared/toolbar/toolbar.html',
							controller: 'toolBarController',
							controllerAs: 'toolBarVM'
						},
						'sidebar': {
							templateUrl:'app/shared/sidebar/sidebar.html',
							controller: 'sideBarController',
							controllerAs: 'sidebarVM'
						}
					}
					
				})
		$urlRouterProvider.otherwise('/home');
		}


})()	