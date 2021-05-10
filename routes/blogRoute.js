'use strict'

var express = require('express');
//Trabajar con blog
var BlogController = require('../controllers/BlogController');
var router = express.Router();
var md_authenticated = require('../middlewares/authenticated');
const multer  = require('multer')
const storageBlog = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/blog/')
    },
    filename: function (req, file, cb) {
        var file_path = file.originalname;
        var ext_split = file_path.split('\.');
        var file_ext = ext_split[1];
        var id = req.blog.sub;
        var date = Date.now()
        var BlogIdNumeric = date+id+parseInt(date*3)
        cb(null, "blog" + '-' + BlogIdNumeric +'.'+file_ext);//file.originalname
    }
})
const uploadBlog = multer({ storage: storageBlog })//Esto es un middleware 
//Rutas de blog
router.post('/save',md_authenticated.authenticated, BlogController.save);
router.delete('/delete',md_authenticated.authenticated, BlogController.delete);
router.put('/update',md_authenticated.authenticated, BlogController.update);
router.get('/getBlogs', BlogController.getBlogs);
router.get('/getBlog/:blogId',md_authenticated.authenticated, BlogController.getBlog);
router.post('/uploadImage',[md_authenticated.authenticated, uploadBlog.single('file0')], BlogController.uploadImage);
router.get('/getImage/:fileName', BlogController.getImage);


module.exports = router;