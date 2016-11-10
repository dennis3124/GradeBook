 (function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', '$mdThemingProvider', routeAppConfig]);

		function routeAppConfig ($stateProvider,$urlRouterProvider,$mdThemingProvider){
		$mdThemingProvider.theme('altTheme')
    		.primaryPalette('purple') 
    		
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
					},
					abstract: true
				})
		$urlRouterProvider.otherwise('/home');
		}


})()	