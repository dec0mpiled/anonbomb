var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var posts = new Schema({ value: String, sid: String, created: Date });


var User = new Schema({
    pid: String,
    sid: String,
    postss: [posts],

});

module.exports = mongoose.model('users', User);