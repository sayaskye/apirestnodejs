'use strict'
//Servidor Node JS
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express
var app = express();

//Cargar archivos de rutas
var routesUser  = require('./routes/userRoute');
var routesPortfolio  = require('./routes/portfolioRoute');
var routesBlog  = require('./routes/blogRoute');
//var routesComment  = require('./routes/commentRoute');
//var UserRoutes  = require('./routes/UserRoutes');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));//Config necesaria para que bodyparser funcione
app.use(bodyParser.json());//Todo lo que le llega lo pasa a json

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use('/api/users',routesUser);
app.use('/api/portfolio',routesPortfolio);
app.use('/api/blog',routesBlog);
//app.use('/api/comment',routesComment);
//app.use('/api/user',UserRoutes);

//Exportar
module.exports=app;//Tiene toda la config de los middlewares
