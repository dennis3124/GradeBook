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
			//get all semesters that this student has
			var getSemesters = function(studentId) {
					return $http.get('http://localhost:27017/api/semesters/' + studentId).then(function(data) {
						return data;
					}).catch(function(err) {
						console.log(err);
					})
				};	
				
				//get the semester with this semesterID
			var getSemester = function(semesterId) {
				return $http.get('http://localhost:27017/api/semester/' + semesterId).then(function(data){
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

			var postCourse = function(courseObj){
				return $http.post('http://localhost:27017/api/courses', courseObj).then(function(err,data){
						return data;
					}).catch(function(err){
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

			var getCourses = function(semesterId) {
					return $http.get('http://localhost:27017/api/courses/' + semesterId).then(function(data){
						return data;
					}).catch(function(err){
						console.log(err);
					})

			};

				return {
					postCourse: postCourse,
					getSemester:getSemester,
					getCourses: getCourses,
					getCurrentSemester: getCurrentSemester,
					getStudents: getStudents,
					postStudents: postStudents,
					getSemesters: getSemesters,
					postSemesters: postSemesters
				};
		}])
})()