//Setting up middleware to be used by web applications
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configuration
mongoose.connect('mongodb://localhost/db_student');

app.use(express.static(__dirname + '/'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// Add headers
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
	if(req.headers.origin){
		// Website you wish to allow to connect
   	 	res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//define schema and model

var schema = new Schema( {
	semester: String,
	courses: [String],
	year: Number,
});

var gradesSchema = new Schema( {
	semester: String,
	year: Number,
	course: String,
	grades: [{examName:String, score:Number, weightage: Number}]

});

var Student = mongoose.model('Student', schema);
var Grades = mongoose.model('Grade', gradesSchema);


//define routes and apis 

app.get('/api/:semester/:year/:course/grades', function(req,res) {
	Grades.find(
		{semester:req.params.semester, year:req.params.year, course:req.params.course}, //query grades in database
		function(err,data) {
		if(err)	
			res.send(err);	//send err if err exists
		res.json(data);	//return all grades in json format
	})
})

app.get('/api/semesters', function(req,res) {
	//get all semesters in mongodb database

	Student.find({},function(err,data) {
		if(err)
			res.send(err);	//send err as response
		res.json(data);	//return all semesters in json format
	});
});

app.post('/api/semester', function(req,res) {
	Student.create({
		semester: req.body.semester,
		year: req.body.year,
		courses: req.body.courses
	},function(err,data){
		if (err)
			res.send(err);
		Student.find(function(err,data){	 //get all semesters after creating
			if (err)
				res.send(err);
			res.json(data); 	//post result as json format
		});
	});
});

app.delete('/api/delete/:semester/:year', function(req,res){
	Student.remove({
		semester: req.params.semester,
		year:req.params.year
	}, function(err,data) {
		if(err)
			res.send(err);
		Student.find(function(err,data){	 //get all semesters after creating
			if (err)
				res.send(err);
			res.json(data); 	//post result as json format
		});
	});
});
app.put('/api/update', function(req,res) {
	Student.update(
	{_id:req.body._id},
	{semester:req.body.semester,
	 year:req.body.year,
	courses: req.body.courses,
	}, function(err,data) {
		if(err)
			res.send(err);
		Student.find(function(err,data) {
			if (err)
				res.send(err);
			res.json(data);
		});
	});
});

app.listen(8081);
console.log("App listening on port 8081");
