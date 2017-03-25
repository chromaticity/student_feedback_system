var mongoose = require('mongoose');

module.exports = mongoose.model('Feedbacks', {
    text: {
        type: String,
        default: ''
    },
    type: {
    	type: String,
    	default: ''
    }
});