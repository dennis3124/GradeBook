 (function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider', routeAppConfig])
	    .run(run)
	    .directive('stringToNumber', function() {
  		return {
	  		  require: 'ngModel',
	  		  link: function(scope, element, attrs, ngModel) {
	  		    ngModel.$parsers.push(function(value) {
	  		      return '' + value;
	  		    });
	  		    ngModel.$formatters.push(function(value) {
	  		      return parseFloat(value);
	  		    });
	  		  }
	  		};
		});
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
				    },
				    abstract: true
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

		//run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
		//function run($rootScope, $location, $cookieStore, $http) {
		//    // keep user logged in after page refresh
		//    $rootScope.globals = $cookieStore.get('globals') || {};
		//    if ($rootScope.globals.currentUser) {
		//        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		//    }

		//    $rootScope.$on('$locationChangeStart', function (event, next, current) {
		//        // redirect to login page if not logged in and trying to access a restricted page
		//        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
		//        var loggedIn = $rootScope.globals.currentUser;
		//        if (restrictedPage && !loggedIn) {
		//            $location.path('/login');
		//        }
		//    });
		//}
		run.$inject = ['$state', '$rootScope', '$location', '$cookies'];
		function run($state, $rootScope, $location, $cookies) {

		    // keep user logged in after page refresh
		    $rootScope.globals = ($cookies.get('globals')) ? JSON.parse($cookies.get('globals')) : null;
		    console.log('globals (should be set if cookie was present): ', $rootScope.globals);

		    if ($rootScope.globals) {
		        console.log('Found a cookie for the logged in user: ', $rootScope.globals.currentUser);
		    }

		    $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
		        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
		        var isUserLoggedIn = ($rootScope.globals) && ($rootScope.globals.currentUser) ? true : false;
		        console.log('restricted page: ', restrictedPage, ', logged in: ', isUserLoggedIn);

		        // redirect to login page if not logged in and trying to access a restricted page
		        if (restrictedPage && !isUserLoggedIn) {
		            // This actually gets entered!
		            console.log('Page is restricted and user is not logged in - redirecting to login from listener.');
		            $state.go('login');
		            //$location.path('/login');
		        }
		        else if (!restrictedPage && isUserLoggedIn) {
                    $state.go('root.home');
		        }
		    });
		}
     
		//function config($routeProvider, $locationProvider) {
		//    $routeProvider
        //        .when('/login', {
        //            controller: 'loginController',
        //            templateUrl: 'login/login.view.html',
        //            controllerAs: 'vm'
        //        })

        //        .when('/register', {
        //            controller: 'RegisterController',
        //            templateUrl: 'register/register.view.html',
        //            controllerAs: 'vm'
        //        })

        //        .otherwise({ redirectTo: '/login' });
		//} 
		

})()	