// app/routes.js

// grab the student model
var Student = require('./models/student');
var Semesters = require('./models/semesters');
var Courses = require('./models/courses');
var Section = require('./models/section');
var Grade = require('./models/section');

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

	app.post('/api/grades', function(req,res) {
		Courses.create({
			courseName: req.body.courseName,
			semesterId: req.body.semesterId
		},function(err,data) {
			if (err)
				res.send(err);
		})
	})
	app.post('/api/semesters', function(req, res) {
	
		Semesters.create({
			currentSemester: req.body.currentSemester,
			studentId: req.body.studentId,
			year: req.body.year,
			name: req.body.name,
		},function(err,data){
			if (err)
				res.send(err);
		});

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
			sectionName: req.body.sectionName,
			courseId: req.body.courseId
		},function(err,data){
			if (err)
				res.send(err);
		});

	});
	app.post('/api/grade', function(req, res) {

		Grade.create({
			grade: req.body.grade,
			sectionId: req.body.sectionId,
			totalGrade: req.body.totalGrade
		},function(err,data){
			if (err)
				res.send(err);
		});

	});

	app.get('/api/grade/:sectionId', function(req,res) {
		// use mongoose to get current grade with the section ID
		Grade.find({
			sectionId: req.params.studentId,
		},function(err, grades) {
			if (err) // Error handling
				res.send(err);
			res.json(grades); // return all students in JSON
		});
	});

	app.get('/api/section/:courseId', function(req,res) {
		// use mongoose to get sections with course ID
		Section.find({
			courseId: req.params.studentId,
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
