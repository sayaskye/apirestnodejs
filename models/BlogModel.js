'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
    content: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' }
});

var Comment = mongoose.model('Comment',CommentSchema);

var BlogSchema = Schema({
    title: String,
    content: String,
    code: String,
    tecnology: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
    comments:[CommentSchema]
});

//Mongoose minimiza el nombre y lo pluraliza, por eso el resultado es "users", asi como en la BD
module.exports = mongoose.model('Blog', BlogSchema);