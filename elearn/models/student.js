var mongoose = require('mongoose');

//schema for students
var studentSchema = mongoose.Schema({
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

var Student = module.exports = mongoose.model('Students', studentSchema);

//get the student by username
module.exports.getStudentByUsername = function(username, callback){
  Student.findOne({username: username}, callback);
}

// Register Student for Class
module.exports.register = function(info, callback) {
    student_username = info['student_username'];
    class_id = info['class_id'];
    class_title = info['class_title'];

    var query = {username: student_username};
    Student.findOneAndUpdate(
      query,
      {$push: {"classes": {class_id: class_id, class_title: class_title}}},
      {safe: true, upsert: true},
      callback
    );
}
