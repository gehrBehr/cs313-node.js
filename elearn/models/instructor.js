var mongoose = require('mongoose');

//schema for instructors
var instructorSchema = mongoose.Schema({
	firstName: {
		type: String
    },
    lastName: {
		type: String
	},
	address: [{
        street: {type: String},
        city: {type: String},
        state: {type: String},
        zip: {type: String}
	}],
	username:{
		type:String
	},
	email:{ 
		type:String
  },
  classes:[{
       class_id: {type: [mongoose.Schema.Types.ObjectId]},
       class_title: {type: String}
   }]
	
});

var Instructor = module.exports = mongoose.model('instructor', instructorSchema);

//gets the username of the Instructor
module.exports.getInstructorByUsername = function(username, callback){
  Instructor.findOne({username: username}, callback);
}

// Register Instructor for Class
module.exports.register = function(info, callback) {
  instructor_username = info['instructor_username'];
  class_id = info['class_id'];
  class_title = info['class_title'];

  var query = {username: instructor_username};
  Instructor.findOneAndUpdate(
    query,
    {$push: {"classes": {class_id: class_id, class_title: class_title}}},
    {safe: true, upsert: true},
    callback
  );
}
