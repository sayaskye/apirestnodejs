'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String
});

/* UserSchema.methods.toJSON = ()=>{
    var obj = this.toObject();
    delete obj.password;
    return obj;
} */
//Mongoose minimiza el nombre y lo pluraliza, por eso el resultado es "users", asi como en la BD
module.exports = mongoose.model('User', UserSchema);




