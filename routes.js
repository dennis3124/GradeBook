// app/routes.js

// grab the student model
var Student = require('./models/student');
var Semesters = require('./models/semesters');
var Courses = require('./models/courses');
var Section = require('./models/section');
var Grade = require('./models/grade');

module.exports = function(app) {
	// server routes
	// handle api calls
	// authentication routes

	// sample api route
	app.get('/api/students', function(req,res) {
		// use mongoose to get all students in the database
		Student.find({},function(err, students) {
			if (err) // Error handling
				res.send(err);
			res.json(students); // return all students in JSON
		});
	});

	app.get('/api/semester/:semesterId', function(req,res) {
		//get the semester with the semesterID
		Semesters.find({
			_id: req.params.semesterId
		}, function(err,semester){
			if(err)
					res.send(err)
			res.json(semester);
		});
	});

	//get all courses with the semesterID
	app.get('/api/courses/:semesterId',function(req,res){
		Courses.find({
			semesterId: req.params.semesterId
		},function(err,courses) {
			if(err)
				res.send(err)
			res.json(courses);
		});
	});

	app.get('/api/semesters/:studentId', function(req,res) {
		// use mongoose to get all semester with the student ID
		Semesters.find({
			studentId: req.params.studentId
		},function(err, students) {
			if (err) // Error handling
				res.send(err);
			res.json(students); // return all students in JSON
		});
	});

	app.get('/api/semesters/current/:studentId', function(req,res) {
		// use mongoose to get current semester with the student ID
		Semesters.find({
			studentId: req.params.studentId,
			currentSemester: true,
		},function(err, students) {
			if (err) // Error handling
				res.send(err);
			res.json(students); // return all students in JSON
		});
	});


	app.post('/api/courses', function(req,res) {
		Courses.create({
			courseName: req.body.courseName,
			courseId: req.body.courseId,
			semesterId: req.body.semesterId,
			creditHours: req.body.creditHours,
			letterGrade: req.body.letterGrade
		},function(err,data) {
			if (err)
				res.send(err);
		})
	})
	app.post('/api/semesters', function(req, res) {
		if(req.body.currentSemester==true) {
				Semesters.update({currentSemester: true}, {currentSemester: false}, {multi: true },function(err,res) {
					Semesters.create({
				 	currentSemester: req.body.currentSemester,
				 	studentId: req.body.studentId,
				 	year: req.body.year,
				 	name: req.body.name,
				 	GPA: req.body.GPA,
				 },function(err,data){
			 		if (err)
		 				res.send(err);
				 });

				if(err) {
					res.send(err);
				}
				})
		}
		else {
		 Semesters.create({
		 	currentSemester: req.body.currentSemester,
		 	studentId: req.body.studentId,
		 	year: req.body.year,
		 	name: req.body.name,
		 },function(err,data){
		 	if (err)
		 		res.send(err);
		 });
		}
	});

	//get individual course
	app.get('/api/course/:courseId', function(req,res){
		Courses.find({
			_id: req.params.courseId
		},function(err,course){
			if (err) 
				res.send(err);
			
			res.json(course);
		})
	});

	app.post('/api/students', function(req, res) {

		Student.create({
			name: req.body.name,
			studentId: req.body.studentId
		},function(err,data){
			if (err)
				res.send(err);
		});

	});


	app.post('/api/section', function(req, res) {

		Section.create({
			sectionName: req.body.name,
			courseId: req.body.courseId,
			weight: req.body.weight,
		},function(err,data){
			if (err)
				res.send(err);
		});

	});
	app.post('/api/grade', function(req, res) {

		Grade.create({
			grade: req.body.grade,
			sectionId: req.body.sectionId,
			totalGrade: req.body.totalGrade,
			name: req.body.name,
		},function(err,data){
			if (err)
				res.send(err);
		});

	});

	app.delete('/api/course/:courseId', function(req,res) {
			Courses.remove({
				_id: req.params.courseId}, function(err) {
						if(err) {
							console.log(err);
						}
				})
	});

	app.delete('/api/section/:courseId',function(req,res) {
		Section.remove({
			courseId: req.params.courseId}, function(err) {
				if(err)
					console.log(err);
			})
	})
	app.delete('/api/grade/:sectionId', function(req,res) {
		Grade.remove({
			sectionId: req.params.sectionId},function(err){
				if(err)
					console.log(err);
			})
	})

	app.delete('/api/semester/:semesterId', function(req,res) {

		Semesters.remove({
			_id: req.params.semesterId}, function(err, semester) {
				if(err)
					console.log(err)
		})
		Courses.find({semesterId: req.params.semesterId}, function(err,courses) {
			
			if (err)
				console.log(err)
			for ( var i = 0; i < courses.length; i++) {
				Section.find({courseId: courses[i]._id}, function(err, sections) {
					if(err)
						console.log(err)
					for( var j = 0 ; j< sections.length; j++) {
						Grade.remove({sectionId: sections[j]._id}, function(err,grades) {
							if(err)
								console.log(err);
						})
					}
				}) 
				Section.remove({courseId: courses[i]._id}, function(err,sections) {
					if(err)
						console.log(err);
				})
				
			}
	
		})
		Courses.remove({semesterId: req.params.semesterId}, function(err,courses) {
			if (err)
				console.log(err);
		})
		
		
	});

	app.get('/api/grade/:sectionId', function(req,res) {
		// use mongoose to get current grade with the section ID
		Grade.find({
			sectionId: req.params.sectionId,
		},function(err, grades) {
			if (err) // Error handling
				res.send(err);
			res.json(grades); // return all students in JSON
		});
	});

	app.get('/api/section/:courseId', function(req,res) {
		// use mongoose to get sections with course ID
		Section.find({
			courseId: req.params.courseId,
		},function(err, sections) {
			if (err) // Error handling
				res.send(err);
			res.json(sections); // return all students in JSON
		});
	});

	// Any routes to handle creating or deleting goes here?
	
	// Route to handle angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./Index.html');
	// });

};
