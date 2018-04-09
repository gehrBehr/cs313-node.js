var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Class Schema
var classSchema = new Schema({
	title: {
		type: String,
		ref: 'title'
	},
	description: {
		type: String,
		ref: 'body'

	},
	instructor:{
		type:String,
		ref: 'teacher'
	},
	lessons:[{
		lesson_number: {type: Number},
		lesson_title: {type: String},
		lesson_body:{type: String}
	}]
});
var Class = mongoose.model('classes', classSchema);

// Fetch All Classes
getClasses = function(callback, limit){
	mongoose.model.find(callback).limit(limit);
}

// Fetch Single Class
module.exports.getClassById = function(id, callback){
	Class.findById(id, callback);
}