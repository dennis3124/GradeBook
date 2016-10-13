// app/models/student.js
// grab mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema( {
	name: String,
	studentId: String
});

// define student model
// module.export allows us to pass this to other files when it is called.
module.exports = mongoose.model('Student',schema);
