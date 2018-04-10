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

module.exports = app;
