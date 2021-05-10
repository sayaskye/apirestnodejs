'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '1674A5193364A29D3AAB28CB8676B';
//los middlewares tienen 3 parametros siempre, next es permitir que salga del middleware y ejecute lo que sigue
exports.authenticated=(req,res,next)=>{

    //Comprobar si llega la cabecera authorization
    if(!req.headers.authorization){
        return res.status(403).send({
            message:'La peticion no tiene la cabecera de autorizacion'
        })
    }
    //Limpiar el token y quitar comillas en caso de que las traiga
    var token = req.headers.authorization.replace(/['"]+/g,'');
    //dentro de trycatch por que es sensible a errores
    try {
        //Decodificar el token
        var payload = jwt.decode(token, secret);
        //Comprobar la expiracion del token
        if(payload.exp<=moment().unix()){
            return res.status(404).send({
                message:'El token ha expirado'
            })
        }
    } catch (error) {
        return res.status(404).send({
            message:'El token no es valido'
        })
    }
    
    //Adjuntar usuario identificado a la request
    req.user = payload;

    //Terminar el middleware
    next();
}