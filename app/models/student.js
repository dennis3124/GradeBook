// app/models/student.js
// grab mongoose module
var mongoose = require('mongoose');
// define student model
// module.export allows us to pass this to other files when it is called.
module.exports = mongoose.model('Student', {
	name : {type: String, default: ''}
});

