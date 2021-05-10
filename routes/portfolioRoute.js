'use strict'

var express = require('express');
//Trabajar con portfolio
var PortfolioController = require('../controllers/PortfolioController');
var router = express.Router();
var md_authenticated = require('../middlewares/authenticated');
const multer  = require('multer')
const storagePortfolio = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/portfolio/')
    },
    filename: function (req, file, cb) {
        var file_path = file.originalname;
        var ext_split = file_path.split('\.');
        var file_ext = ext_split[1];
        cb(null, "portfolio" + '-' + Date.now() +'.'+file_ext);//file.originalname
    }
})
const uploadPortfolio = multer({ storage: storagePortfolio })//Esto es un middleware 
//Rutas de portfolio
router.post('/save',[md_authenticated.authenticated, uploadPortfolio.single('file0')], PortfolioController.save);
router.delete('/delete',md_authenticated.authenticated, PortfolioController.delete);
router.put('/update',md_authenticated.authenticated, PortfolioController.update);
router.get('/getPortfolios', PortfolioController.getPortfolios);
router.get('/getPortfolio/:portfolioId',md_authenticated.authenticated, PortfolioController.getPortfolio);
router.post('/uploadImage',[md_authenticated.authenticated, uploadPortfolio.single('file0')], PortfolioController.uploadImage);
router.get('/getImage/:fileName', PortfolioController.getImage);


module.exports = router;