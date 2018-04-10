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
