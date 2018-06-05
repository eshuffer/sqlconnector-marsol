var mongoose = require('mongoose')

const equiposSchema = new mongoose.Schema({
    idContrato : String,
    serialInterno : String,
    codigoItem : String,
    nombre : String,
    CustomerCode : String, 
    CustomerName : String,
    ciudad : {type : String, default : '-'},
    direccion : {type : String, default : '-'},
    comuna : {type : String, default : '-'},
    lugarInstalacion : {type : String, default : '-'},
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date},
    updatedBy : String
});
module.exports = mongoose.model('equipo', equiposSchema);