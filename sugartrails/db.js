var mongoose = require('mongoose');

//for user
var user = new mongoose.Schema({
	name: String,
	glucose: Number,
	insulin: Number,
	date: Number
});

mongoose.model('User', User);

mongoose.connect('mongodb://localhost/userdb');