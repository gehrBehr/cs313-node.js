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

var Instructor = module.exports = mongoose.model('Instructor', instructorSchema);
