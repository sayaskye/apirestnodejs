'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PortfolioSchema = Schema({
    title: String,
    description: String,
    image: String,
    tecnology: String,
    date: { type: Date, default: Date.now },
    user:String,
    userid: { type: Schema.ObjectId, ref: 'User' }
});

//Mongoose minimiza el nombre y lo pluraliza, por eso el resultado es "users", asi como en la BD
module.exports = mongoose.model('Portfolio', PortfolioSchema);