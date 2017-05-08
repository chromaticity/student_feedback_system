var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var socketio = require('socket.io');

// schema of our data goes here
var feedbackSchema = new Schema({
    // text: {
    //     type: String,
    //     default: ''
    // },
    type: {
    	type: String,
    	default: ''
    }
});

// model creation with your schema
module.exports = mongoose.model('Feedbacks', feedbackSchema);