'use strict'

var express = require('express');
//Trabajar con usuarios
var UserController = require('../controllers/UserController');
var router = express.Router();
var md_authenticated = require('../middlewares/authenticated');
const multer  = require('multer')
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/users/')
    },
    filename: function (req, file, cb) {
        var file_path = file.originalname;
        var ext_split = file_path.split('\.');
        var file_ext = ext_split[1];
        var id = req.user.sub;
        var date = Date.now()
        var userIdNumeric = date+id+parseInt(date*3)
        cb(null, "user" + '-' + userIdNumeric +'.'+file_ext);//file.originalname
    }
})
const uploadUser = multer({ storage: storageUser })//Esto es un middleware 
//Rutas de usuario
router.post('/save', UserController.saveUser);
router.post('/login', UserController.loginUser);
router.put('/update',md_authenticated.authenticated, UserController.updateUser);//,md_authenticated.authenticated le clava en el medio de la ejecucion el middleware
router.post('/upload',[md_authenticated.authenticated, uploadUser.single('file0')], UserController.uploadUser);
router.get('/avatar/:fileName', UserController.avatarUser);
router.get('/getUsers/',md_authenticated.authenticated, UserController.getUsers);
router.get('/getUser/:userId',md_authenticated.authenticated, UserController.getUser);


module.exports = router;