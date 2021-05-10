'use strict'
const validator = require('validator');
const Blog = require('../models/BlogModel');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');


var BlogController={
    save:(req,res)=>{
        return res.status(200).send({
            message:'desde save b'
        });
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
    getBlogs:(req,res)=>{
        return res.status(200).send({
            message:'desde getPorfolios'
        });
    },
    getBlog:(req,res)=>{
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
module.exports = BlogController;