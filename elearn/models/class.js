var mongoose = require('mongoose');

// Class Schema
var classSchema = mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	instructor:{
		type:String
	},
	lessons:[{
		lesson_number: {type: Number},
		lesson_title: {type: String},
		lesson_body:{type: String}
	}]
});

var Class = module.exports = mongoose.model('Class', classSchema);

// Fetchs all Classes. the limit makes it so only three newest show.
module.exports.getAllClasses = function(callback){
	Class.find(callback);
}
//get's three classes
module.exports.getClasses = function(callback, limit){
	Class.find(callback).limit(limit);
}

// Fetch one class
module.exports.getClassById = function(id, callback){
	Class.findById(id, callback);
}

// add lesson
module.exports.addLesson = function(info, callback){
	class_id = info['class_id'];
	lesson_number = info['lesson_number'];
	lesson_title = info['lesson_title'];
	lesson_body = info['lesson_body'];

	Class.findByIdAndUpdate(
		class_id,
		{$push:{"lessons":{lesson_number: lesson_number, lesson_title: lesson_title, lesson_body: lesson_body}}},
		{safe: true, upsert:true}, callback);
}
