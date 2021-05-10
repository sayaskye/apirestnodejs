'use strict'
const validator = require('validator');
const Portfolio = require('../models/PortfolioModel');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');


var PortfolioController={
    save:(req,res)=>{
        var params = req.body;
        try {
            var validate_title=!validator.isEmpty(params.title);
            var validate_description=!validator.isEmpty(params.description);
            var validate_tecnology=!validator.isEmpty(params.tecnology);
            var file_name = 'Imagen de portafolio no ha sido subida...';
            if(!req.file){
                return res.status(404).send({
                    message:file_name
                });
            }
            var file_path = req.file.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var ext_split = file_path.split('\.');
            var file_ext = ext_split[1];
            var userName = req.user.name;
            var userSurname = req.user.surname;
            if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
                fs.unlink(file_path,(error)=>{
                    return res.status(200).send({
                        message:'La imagen que intentaste subir no es valida, asegurate de que sea png, jpg, jpeg o gif',
                        file_name
                    });
                })
            }else{
                if(
                    validate_title &&
                    validate_description &&
                    validate_tecnology 
                ){
                    var portfolio = new Portfolio();
                    portfolio.title=params.title;
                    portfolio.description=params.description;
                    portfolio.tecnology=params.tecnology;
                    portfolio.image=file_name;
                    portfolio.user=userName + ' ' +userSurname;
                    portfolio.userid=req.user.sub;
                    Portfolio.findOne({
                        title:portfolio.title
                    }, (error,issetProject)=>{
                        if(error){
                            return res.status(500).send({
                                message:'Error al comprobar la duplicidad del proyecto, verifica la conexion a la bd'
                            });
                        }
                        if(!issetProject){
                            portfolio.save((error,projectSaved)=>{
                                if(error){
                                    return res.status(500).send({
                                        message:'Error al guardar el proyecto, verifica la conexion a la bd'
                                    });
                                }
                                if(!projectSaved){
                                    return res.status(400).send({
                                        message:'Error al guardar el proyecto, no hay proyecto que guardar'
                                    });
                                }else{
                                    return res.status(200).send({
                                        proyecto:projectSaved
                                    })
                                }
                            })
                        }else{
                            return res.status(500).send({
                                message:'El proyecto ya existe en la base de datos'
                            });
                        }
                    })
                }else{
                    return res.status(400).send({
                        message:'Registro de proyecto no ha podido ser completado, verifica tu informacion para que sea valida'
                    });
                }
            }
        } catch (error) {
            return res.status(400).send({
                message:'Alguno de los campos a recibir ha fallado, verifica que los estes enviando correctamente'
            });
        }
    },
    delete:(req,res)=>{
        return res.status(200).send({
            message:'desde delete'
        });
    },
    update:(req,res)=>{
        return res.status(200).send({
            message:'desde update'
        });
    },
    getPortfolios:(req,res)=>{
        return res.status(200).send({
            message:'desde getPorfolios'
        });
    },
    getPortfolio:(req,res)=>{
        return res.status(200).send({
            message:'desde getPorfolio'
        });
    },
    uploadImage:(req,res)=>{
        return res.status(200).send({
            message:'desde uploadImage'
        });
    },
    getImage:(req,res)=>{
        return res.status(200).send({
            message:'desde getImage'
        });
    }
    
}
module.exports = PortfolioController;