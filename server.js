// Server.js
// Modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
//var passport = require('passport');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	if(req.headers.origin){
		// Website you wish to allow to connect
   	 	res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    //res.setHeader('Access-Control-Allow-Origin', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Use passpor package
//app.use(passport.initialize());

// Config
mongoose.connect('mongodb://localhost/gradebook');
// Set up static file location
//app.use(express.static(__dirname + "/"));
// parse application/json
app.use(bodyParser.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Set port
var port = process.env.PORT || 27017;

// Define schemas
// var studentSchema
// var gradesSchema
// var coursesSchema

// Define API routes
require('./routes')(app); // configure routes

// Start app
app.listen(port);
console.log("Listening on port:" + port);


