'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '1674A5193364A29D3AAB28CB8676B';
//var secret = '3sT0_e5-Un4-C14v3_53cREt4';


exports.createToken = (user)=>{
    var payload = { 
        sub: user._id,
        name:user.name,
        surname:user.surname,
        email:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(30, 'days').unix()
    };
    return jwt.encode(payload,secret);
}



/* var payload = { foo: 'bar' };
var secret = 'xxx';
 
// encode
var token = jwt.encode(payload, secret);
 
// decode
var decoded = jwt.decode(token, secret);
console.log(decoded); //=> { foo: 'bar' } */