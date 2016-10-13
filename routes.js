// app/routes.js

// grab the student model
var Student = require('./models/student');
var Semesters = require('./models/semesters')
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


	app.post('/api/semesters', function(req, res) {
	
		Semesters.create({
			currentSemester: req.body.currentSemester,
			studentId: req.body.studentId,
			year: req.body.year,
			name: req.body.name,
			courses: req.body.courses
		},function(err,data){
			if (err)
				res.send(err);
		});

	});



	app.post('/api/students', function(req, res) {

		Student.create({
			sem: req.body.sem,
			name: req.body.name,
			studentId: req.body.studentId
		},function(err,data){
			if (err)
				res.send(err);
		});

	});

	// Any routes to handle creating or deleting goes here?
	
	// Route to handle angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./Index.html');
	// });

};
