var express = require('express');
var app = express();

var Class = require('../models/class');

// GET home page classes.
app.get('/', function(req, res, next) {
	Class.getClasses(function(err, classes){
		res.render('index', { classes: classes });
	},3);
});
app.get('/home', function(req, res, next) {
	Class.getClasses(function(err, classes){
		res.render('index', { classes: classes });
	},3);
});

module.exports = app;
