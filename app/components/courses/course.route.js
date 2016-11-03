(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider',courseRouter]);

		function courseRouter($stateProvider,$urlRouterProvider) {
			var vm = this;

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