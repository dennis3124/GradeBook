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
// Set up static file location
app.use(express.static(_dirname + "/"));
// parse application/json
app.use(bodyParser.json());
app.use(methodOverride());

// Set port
var port = process.env.PORT || 8080;

// Define schemas
// var studentSchema
// var gradesSchema
// var coursesSchema

// Define API routes
require('./app/routes')(app); // configure routes

// Start app
app.listen(port);
console.log("Listening on port:" + port);


