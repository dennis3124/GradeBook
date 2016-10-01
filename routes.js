// app/routes.js

// grab the student model
var Student = require('./models/student');

module.exports = function(app) {
	// server routes
	// handle api calls
	// authentication routes

	// sample api route
	app.get('/api/students', function(req,res) {
		// use mongoose to get all students in the database
		Student.find(function(err, students) {
			if (err) // Error handling
				res.send(err);
			res.json(students); // return all students in JSON
		});
	});

	// Any routes to handle creating or deleting goes here?
	
	// Route to handle angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./Index.html');
	// });

};
