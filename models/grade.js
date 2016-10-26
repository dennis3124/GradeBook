// app/models/semesters.js
// grab mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grade = new Schema( {
	sectionId: String,
	name:String,
	grade: String,
	totalGrade: String
})
// define student model
// module.export allows us to pass this to other files when it is called.
module.exports = mongoose.model('Grade', grade);