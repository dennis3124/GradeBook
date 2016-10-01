// Server.js
// Modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

// Config
mongoose.connect('mongodb://localhost/gradebook');
app.use(express.static(_dirname + "/"));
app.use(bodyParser.json());
app.use(methodOverride());


// Define schemas
// var studentSchema
// var gradesSchema
// var coursesSchema

// Define API routes
// General error handling
function handleError(res, reason, message, code) {
	console.log("Error: " + reason);
	res.status(code || 500).json({"error": message});
}

