// app/models/semesters.js
// grab mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courses = new Schema( {
	courseName: String,
	courseId: String,
	semesterId: String,
	creditHours: String,
	letterGrade: String
})
// define student model
// module.export allows us to pass this to other files when it is called.
module.exports = mongoose.model('Courses', courses);
