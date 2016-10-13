(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider',courseRouter]);

		function courseRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.course', {
					 url: '/courses',
					 views: {
					 	'content@': {
					 		templateUrl: 'app/components/courses/course.html',					 
							controller: 'courseController',
					 		controllerAs: 'courseVM'
					 	}
					 }
				})
			
		}
})()