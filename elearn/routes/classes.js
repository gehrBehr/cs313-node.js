var express = require('express');
var app = express();


var Class = require('../models/class');

//Classes Page
app.get('/', function(req, res, next) {
	Class.getAllClasses(function(err, classes){
		if(err) throw err;
		res.render('classes/index', { classes: classes, layout: 'classLayout'});
	},3);
});

// Class Details
app.get('/:id/details', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		if(err) throw err;
		res.render('classes/details', { class: classname, layout: 'classLayout' });
	});
});

// Get Lessons
app.get('/:id/lessons', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		if(err) throw err;
		res.render('classes/lessons', { class: classname });
	});
});

// Get Lesson
app.get('/:id/lessons/:lesson_id', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		var lesson;
		if(err) throw err;
		for(i=0; i < classname.lessons.length; i++){
			if(classname.lessons[i].lesson_number == req.params.lesson_id){
				lesson = classname.lessons[i];
			}
		}
		res.render('classes/lesson', { class: classname, lesson: lesson });
	});
});

module.exports = app;
