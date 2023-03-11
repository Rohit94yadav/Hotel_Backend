var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CommentsModel = new Schema({
comment :String,
rating: String,   
postId :String,
userId:String
});
module.exports = mongoose.model('Comments', CommentsModel);