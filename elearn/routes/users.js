var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//requre the models to get data
var User = require('../models/user');
var Student = require('../models/student');
var Instructor = require('../models/instructor');

//user register
app.get('/register', function(req, res, next) {
  res.render('users/register', {layout: 'signUpLayout'});
});

app.post('/register', function(req, res, next) {

  //form validation
  var firstName     	= req.body.firstName;
	var lastName     	= req.body.lastName;
	var street  = req.body.street;
	var city     		= req.body.city;
	var state    		= req.body.state;
	var zip     		= req.body.zip;
	var email    		= req.body.email;
	var username 		= req.body.username;
	var password 		= req.body.password;
	var password2 		= req.body.password2;
	var type            = req.body.type;

	// Form Validation
	req.checkBody('firstName', 'First name field is required').notEmpty();
	req.checkBody('lastName', 'Last name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email must be a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	errors = req.validationErrors();
  if(errors){
		res.render('users/register', {errors: errors, layout: 'signUpLayout'});
  }
  else {
    var newUser = new User({
      email: email,
      username: username,
      password: password,
      type: type});

    if (type == 'student') {
      console.log('Registering a student...');
      var newStudent = new Student({
				firstName: firstName,
				lastName: lastName,
				address: [{
					street: street,
					city: city,
					state: state,
					zip: zip
				}],
				email: email,
				username:username
      });
      User.saveStudent (newUser, newStudent).then(function(result){
        console.log('Student created');
      });
      
    }
    else{
      console.log('Creating an instructor...');
      var newInstructor = new Instructor({
				firstName: firstName,
				lastName: lastName,
				address: [{
					street: street,
					city: city,
					state: state,
					zip: zip
				}],
				email: email,
				username:username
      });
      User.saveInstructor(newUser, newInstructor).then(function (err, user) {
        console.log('Instructor Created')
      });
    }
    req.flash('success_msg', 'User Added');
		res.redirect('/');
  }
});
module.exports = app;
