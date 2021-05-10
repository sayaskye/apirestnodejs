'use strict'

var mongoose = require('mongoose');
var app = require('./app.js');
var port = process.env.PORT || 3700;//Puerto del servidor

mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio', {useNewUrlParser: true , useUnifiedTopology: true})
        .then(()=>{
            console.log("Conexion a la base de datos establecida con exito...");
            //Creacion del servidor (despues de app)
            app.listen(port, ()=> {
                console.log("Servidor corriendo correctamente en la URL: Localhost:"+port);//Si sale bien
            });
        })
        .catch((error)=>{
            console.log(error);
        });



