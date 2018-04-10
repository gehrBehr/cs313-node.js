var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passwordHash = require('password-hash');

//schema for users
var userSchema = mongoose.Schema({
	username: {
		type: String
	},
	email: {
		type: String
	},
	password:{
		type:String
	},
	type:{ //teacher or student
		type:String
	}
	
});

var User = module.exports = mongoose.model('User', userSchema);

//get the user info
module.exports.getUserById = function (id, callback){
    User.findById(id, callback);
}

//get the user by username
module.exports.getByUsername = function(username, callback){
    User.findOne({username: username}, callback);
}

//compare the passwords
module.exports.comparePassword = function(canidatePassword, hash, callback){
    callback(null, hash.verify(canidatePassword, hash));
}

// Create Student User
module.exports.saveStudent = function(newUser, newStudent){
    return bcrypt.hash(newUser.password, 10).then(function(hash){
      newUser.password = hash
      console.log('Student is being saved')
      return Promise.all([newUser.save(), newStudent.save()]);
    }, function(err){
      console.log(err);
      return Promise.reject();
    })
 };
 
 // Create Instructor User
 module.exports.saveInstructor = function(newUser, newInstructor){
    return bcrypt.hash(newUser.password, 10).then(function(hash){
      newUser.password = hash
      console.log('Instructor is being saved')
      return Promise.all([newUser.save(), newInstructor.save()]);
    }, function(err){
      console.log(err);
      return Promise.reject();
    })
 };
