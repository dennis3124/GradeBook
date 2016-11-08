 (function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', '$mdThemingProvider', routeAppConfig]);

		function routeAppConfig ($stateProvider,$urlRouterProvider,$mdThemingProvider){
		$mdThemingProvider.theme('altTheme')
    		.primaryPalette('purple') 
    		
		$stateProvider
				.state('root', {
				})
                .state('login', {
                    url: '/login',
                    views: {
                        'login': {
                            controller: 'loginController',
                            templateUrl: 'app/components/Login/login.html',
                            controllerAs: 'loginVM'
                        }
                    }
                })
                .state('register', {
                    url: '/register', 
                    views: {
                        'register': {
                            controller: 'registerController',
                            templateUrl: 'app/components/Register/register.html',
                            controllerAs: 'registerVM'
                        }
                    }
                })
		$urlRouterProvider.otherwise('/login');
		}


})()	