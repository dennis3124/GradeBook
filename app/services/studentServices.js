(function(){
	angular.module('GradeBook')
		.service('studentService',['$http',function($http) {

			var getStudents = function() {
					return $http.get('http://localhost:27017/api/students').then(function(data) {
						return data;
					}).catch(function(err) {
						console.log(err);
					})
				};

			var getSemesters = function(studentId) {
					return $http.get('http://localhost:27017/api/semesters/' + studentId).then(function(data) {
						return data;
					}).catch(function(err) {
						console.log(err);
					})
				};	

			var getCurrentSemester = function(studentId) {
					return $http.get('http://localhost:27017/api/semesters/current/' + studentId).then(function(data) {
						return data;
					}).catch(function(err) {
						console.log(err);
					})
				};		


			var postStudents = function(studentObj) {
					return $http.post('http://localhost:27017/api/students', studentObj).then(function(err,data){
						return data;
					}).catch(function(err){
						console.log(err);
					})

			};

			var postSemesters = function(semesterObj) {
					return $http.post('http://localhost:27017/api/semesters', semesterObj).then(function(err,data){
						return data;
					}).catch(function(err){
						console.log(err);
					})

			};

				return {
					getCurrentSemester: getCurrentSemester,
					getStudents: getStudents,
					postStudents: postStudents,
					getSemesters: getSemesters,
					postSemesters: postSemesters
				};
		}])
})()