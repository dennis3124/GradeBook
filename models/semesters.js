// app/models/semesters.js
// grab mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var semesters = new Schema( {
	currentSemester: Boolean,
	studentId: String,
	name: String,
	year: Number,
	GPA: Number,
})
// define student model
// module.export allows us to pass this to other files when it is called.
module.exports = mongoose.model('Semesters', semesters);
