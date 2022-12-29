var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ClienteSchemaBizagi= Schema({
    
    tipoIdentificacion:String,
    numeroIdentificacion:String,
    rolInvolucrado:String,
    idEvento:String,
    numeroCaso:String,
})

module.exports= mongoose.model('ClienteBizagi',ClienteSchemaBizagi)