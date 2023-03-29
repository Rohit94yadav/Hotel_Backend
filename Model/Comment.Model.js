var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CommentsModel = new Schema({
comment :String,
rating: String, 
username:String,
image: String, 
hotelId :String,
userId:{ type: String, required: true, default: "user" },
vendorId:{ type: String, required: true, default: "vendor" },
date:String
},
{
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
module.exports = mongoose.model('Comments', CommentsModel);