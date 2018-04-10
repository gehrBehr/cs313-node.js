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
      User.saveInstructor(newUser, newInstructor).then(function (result) {
        console.log('Instructor Created')
      });
    }
    req.flash('success_msg', 'New Account Created!');
    res.redirect('/');
  }
});

//serialize and deserialize the user
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

app.post('/login', passport.authenticate('local',{failureRedirect:'/', failureFlash: true}), function(req, res, next) {
  req.flash('success_msg','You are now logged in');
  var usertype = req.user.type;
  res.redirect('/'+ usertype +'s/classes');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
  	User.getByUsername(username, function(err, user){
    	if (err) throw err;
    	if(!user){
    		return done(null, false, { message: 'Unknown user ' + username }); 
    	}

    	User.comparePassword(password, user.password, function(err, isMatch) {
      		if (err) return done(err);
      		if(isMatch) {
        		return done(null, user);
      		} else {
      			console.log('Invalid Password');
      			// Success Message
        		return done(null, false, { message: 'Invalid password' });
      		}
   	 	});
    });
  }
));

// Log User Out
app.get('/logout', function(req, res){
	req.logout();
 	// Success Message
	req.flash('success_msg', "You have successfully logged out");
  	res.redirect('/');
});

module.exports = app;
