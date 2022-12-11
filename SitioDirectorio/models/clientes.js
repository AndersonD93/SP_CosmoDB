'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ClienteSchema= Schema({
    
    nombre:String,
    direccion:String,
    ciudad:String,
    telefono: String
})

module.exports= mongoose.model('Cliente',ClienteSchema)