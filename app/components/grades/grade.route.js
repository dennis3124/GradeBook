(function(){
	angular.module('GradeBook')
		.config(['$stateProvider','$urlRouterProvider',gradeRouter]);

		function gradeRouter($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('root.grade', {
					 url: '/grades',
					 views: {
					 	'content@': {
					 		templateUrl: 'app/components/grades/grade.html',					 
							controller: 'gradeController',
					 		controllerAs: 'gradeVM'
					 	}
					 }
				})
			
		}
})()