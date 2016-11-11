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
			//get specific course
			var getCourse = function(courseId) {
				return $http.get('http://localhost:27017/api/course/' + courseId).then(function(data){
						return data;
					}).catch(function(err){
						console.log(err);
					})
			}

			var postSection = function(sectionObj) {
					return $http.post('http://localhost:27017/api/section', sectionObj).then(function(err,data){
						return data;
					}).catch(function(err){
						console.log(err);
					})
			}

			var getSection = function(courseId) {
					return $http.get('http://localhost:27017/api/section/' + courseId).then(function(data){
						return data;
					}).catch(function(err){
						console.log(err);
					})			
			}

			var postGrade = function(gradeObj) {
				return $http.post('http://localhost:27017/api/grade', gradeObj).then(function(err,data){
						return data;
					}).catch(function(err){
						console.log(err);
					})
			}
			var getGrade = function(sectionId) {
					return $http.get('http://localhost:27017/api/grade/' + sectionId).then(function(data){
						return data;
					}).catch(function(err){
						console.log(err);
					})	
			}

			var deleteCourse = function(courseId) {
				return $http.delete('http://localhost:27017/api/course/' + courseId).then(function(data) {
					return data;
				}).catch(function(err) {
					console.log(err);
				})
			}
			
			var deleteSections = function(courseId) {
				return $http.delete('http://localhost:27017/api/section/' + courseId).then(function(data) {
					return data;
				}).catch(function(err) {
					console.log(err);
				})
			}

			var deleteGrades = function(sectionId) {
				return $http.delete('http://localhost:27017/api/grade/' + sectionId).then(function(data) {
					return data;
				}).catch(function(err) {
					console.log(err);
				})
			}
			
			var deleteGrade = function(gradeId) {
				//console.log(gradeId);
				return $http.delete('http://localhost:27017/api/single/grade/' + gradeId).then(function(data) {
					return data;
				}).catch(function(err) {
					console.log(err);
				})
			}

			var deleteSemester = function(semesterId) {
				return $http.delete('http://localhost:27017/api/semester/' + semesterId).then(function(data) {
					return data;
				}).catch(function(err) {
					console.log(err);
				})
			}
				return {
					deleteGrade: deleteGrade,
					deleteGrades: deleteGrades,
					deleteSemester: deleteSemester,
					deleteCourse: deleteCourse,
					deleteSections: deleteSections,
					getGrade: getGrade,
					postGrade: postGrade,
					getSection: getSection,
					postSection:postSection,
					getCourse: getCourse,
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