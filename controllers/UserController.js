'use strict'
const validator = require('validator');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');


var UserController={
    saveUser: (req,res)=>{
        //Recoger los parametros de peticion
        var params = req.body;
        //Validar los datos
        try {
            var validate_name=!validator.isEmpty(params.name);
            var validate_surname=!validator.isEmpty(params.surname);
            var validate_email=!validator.isEmpty(params.email)&&validator.isEmail(params.email);
            var validate_password=!validator.isEmpty(params.password);
            var validate_role=!validator.isEmpty(params.role);
            //console.log(validate_name,validate_surname,validate_email,validate_password);
            if(
                validate_name &&
                validate_surname &&
                validate_email &&
                validate_password 
            ){
                //Crear el objeto de usaurio
                var user = new User();
                //Asignar valores al usuario con los datos que vengan de la peticion
                user.name=params.name;
                user.surname=params.surname;
                user.email=params.email.toLowerCase();
                if(validate_role){
                    user.role=params.role;
                }else{
                    user.role='ROLE_USER';
                }
                user.image=null;
                //Comprobar si el usuario ya existe
                User.findOne({
                    email:user.email
                }, (error,issetUser)=>{
                    if(error){
                        return res.status(500).send({
                            message:'Error al comprobar la duplicidad del usuario, verifica la conexion a la bd'
                        });
                    }
                    if(!issetUser){
                        //Si no existe, cifra la contraseña y despues guardarlo
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(params.password, salt, function(err, hash) {
                                user.password=hash;
                                //console.log(user.password);
                                user.save((error,userSaved)=>{
                                    if(error){
                                        return res.status(500).send({
                                            message:'Error al guardar el usuario, verifica la conexion a la bd'
                                        });
                                    }
                                    if(!userSaved){
                                        return res.status(400).send({
                                            message:'Error al guardar el usuario, no hay usuario que guardar'
                                        });
                                    }else{
                                        //Devolver respuesta
                                        return res.status(200).send({
                                            status:'Success',
                                            user:userSaved
                                        })
                                    }
                                })//close save
                            });
                        });//close bcrypt
                    }else{
                        return res.status(500).send({
                            message:'El usuario ya existe en la base de datos'
                        });
                    }
                })
            }else{
                return res.status(400).send({
                    message:'Registro de usuario no ha podido ser completado, verifica tu informacion para que sea valida'
                });
            }
        } catch (error) {
            return res.status(400).send({
                message:'Alguno de los campos a recibir ha fallado, verifica que los estes enviando correctamente'
            });
        }
    },
    loginUser:(req,res)=>{
        //Recoger los parametros de peticion
        var params = req.body;
        //Validar los datos
        try {
            var validate_email=!validator.isEmpty(params.email)&&validator.isEmail(params.email);
            var validate_password=!validator.isEmpty(params.password);
            if(
                validate_email &&
                validate_password 
            ){
                //buscar de usaurio
                User.findOne({
                    email:params.email.toLowerCase()
                }, (error,user)=>{
                    if(error){
                        return res.status(500).send({
                            message:'Error al comprobar el usuario, verifica la conexion a la bd'
                        });
                    }
                    if(user){
                        //comprobar que coincida email y pass
                        //compara la contraseña del parametro con la del hash que recibe de la bd
                        bcrypt.compare(params.password, user.password, function(err, check) {
                            if(check){
                                //generar token y devolverlo
                                if(params.gettoken){
                                    return res.status(200).send({
                                        message:'Token creado con exito',
                                        token: jwt.createToken(user)
                                    });
                                }
                                //limpiar el objeto antes de devolverlo
                                user.password=undefined;
                                //si coincide devolver los datos
                                return res.status(200).send({
                                    message:'Campos validados',
                                    user
                                });
                            }else{
                                return res.status(400).send({
                                    message:'La contraseña no coincide con el email'
                                });
                            }
                        });
                    }else{
                        return res.status(400).send({
                            message:'El usuario no existe en la base de datos'
                        });
                    }
                    
                })
            }else{
                return res.status(400).send({
                    message:'Alguno de los campos no cumple con los requisitos, conprueba que los campos esten llenados correctamente'
                });
            }
        } catch (error) {
            return res.status(400).send({
                message:'Alguno de los campos a recibir ha fallado, verifica que los estes enviando correctamente'
            });
        }
    },
    updateUser:(req,res)=>{
        //Crear middleware para comprobar jwt y pasarselo a la ruta
        //recoger los datos del usuario
        var params = req.body;
        //validar los datos
        try {
            var validate_name=!validator.isEmpty(params.name);
            var validate_surname=!validator.isEmpty(params.surname);
            var validate_email=!validator.isEmpty(params.email)&&validator.isEmail(params.email);
            //eliminar propiedades inecesarias
            delete params.password;
            delete params.role;
        
            if(
                validate_name &&
                validate_surname &&
                validate_email 
            ){
                //buscar y actualizar el documento de la bd
                //User.findOneAndUpdate(Condicion,datosAActualizarJSON,Opciones,Callback)
                var userId= req.user.sub;
                params.email=params.email.toLowerCase();
                //comprobar si el email es unico
                if(req.user.email!=params.email){
                    User.findOne({email:params.email}, (error,user)=>{
                        if(error){
                            return res.status(500).send({
                                message:'Error al comprobar la duplicidad del usuario, verifica la conexion a la bd'
                            });
                        }
                        if(user && user.email==params.email){
                            return res.status(200).send({
                                message:'Una cuenta con este correo ya existe, no ha podido ser modificado'
                            });
                        }else{
                            User.findOneAndUpdate({_id:userId},params,{new:true},(error,userUpdated)=>{
                                //devolver la respuesta
                                if(error){
                                    return res.status(500).send({
                                        message:'Ha ocurrido un error al intentar actualizar los datos del usuario en la base de datos'
                                    });
                                }
            
                                if(!userUpdated){
                                    return res.status(500).send({
                                        message:'Ha ocurrido un error al intentar actualizar los datos del usuario, nunca se obtuvo el usuario'
                                    });
                                }
            
                                return res.status(200).send({
                                    status:'success',
                                    user:userUpdated
                                });
                            })
                        }
                    })
                }else{
                    User.findOneAndUpdate({_id:userId},params,{new:true},(error,userUpdated)=>{
                        //devolver la respuesta
                        if(error){
                            return res.status(500).send({
                                message:'Ha ocurrido un error al intentar actualizar los datos del usuario en la base de datos'
                            });
                        }
    
                        if(!userUpdated){
                            return res.status(500).send({
                                message:'Ha ocurrido un error al intentar actualizar los datos del usuario, nunca se obtuvo el usuario'
                            });
                        }
    
                        return res.status(200).send({
                            status:'success',
                            user:userUpdated
                        });
                    })
                }
            }else{
                return res.status(400).send({
                    message:'Alguno de los esta vacio o mal rellenado, por favor rellenalo correctamente'
                });
            }
        } catch (error) {
            return res.status(400).send({
                message:'Alguno de los campos a recibir ha fallado, verifica que los estes enviando correctamente'
            });
        }
    },
    uploadUser: (req,res)=>{
        //configurar el middleware para habilitar las subidas de imagenes en rutas
        //recoger el fichero de la peticion
        var file_name = 'Avatar no subido...';
        if(!req.file){
            return res.status(404).send({
                status:'error',
                message:file_name
            });
        }
        //conseguir el nombre y la extension del archivo subido
        var file_path = req.file.path;
        var file_split = file_path.split('\\');
        //var file_split = file_path.split('/');usar esta en mac o linux
        //nombre del archivo
        var file_name = file_split[2];
        //extension del archivo
        var ext_split = file_path.split('\.');
        var file_ext = ext_split[1];
        //comprobar la extension para asegurarse que sea imagen, si no es valida borrarla
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            fs.unlink(file_path,(error)=>{
                return res.status(200).send({
                    message:'La imagen que intentaste subir no es valida, asegurate de que sea png, jpg, jpeg o gif',
                    file_name
                });
            })
        }else{
            //sacar el id del user identificado
            var userId = req.user.sub;
            //buscar y actualizar documento de la bd
            User.findOneAndUpdate({_id:userId},{image:file_name},{new:true},(error,userUpdated)=>{
                if(error){
                    return res.status(500).send({
                        message:'Ha ocurrido un error al intentar actualizar la imagen del usuario en la base de datos'
                    });
                }

                if(!userUpdated){
                    return res.status(500).send({
                        message:'Ha ocurrido un error al intentar actualizar la imagen del usuario, nunca se obtuvo el usuario'
                    });
                }

                return res.status(200).send({
                    message:'Se ha subido correctamente la imagen',
                    user:userUpdated
                });
            })
        }
    },
    avatarUser:(req,res)=>{
        var file_name = req.params.fileName;
        var path_file = './uploads/users/'+file_name;

        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    message:'La imagen no existe'
                });
            }
        });
    },
    getUsers:(req,res)=>{
        User.find().exec((error, users)=>{
            if(error || !users){
                return res.status(400).send({
                    message:'No existen usuarios que mostrar'
                });
            }else{
                return res.status(200).send({
                    users
                });
            }
        })
    },
    getUser:(req,res)=>{
        var userId = req.params.userId;
        User.findById(userId).exec((error, user)=>{
            if(error || !user){
                return res.status(400).send({
                    message:'No existen el que quieres mostrar'
                });
            }else{
                return res.status(200).send({
                    user
                });
            }
        })
    }
}
module.exports = UserController;