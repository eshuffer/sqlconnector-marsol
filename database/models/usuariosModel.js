var mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    email : {type : String},
    password : {type : String, default : 'N/A'},
    permisos : {service : Array, connect : Array, chef : Array, pago : Array, beneficios : Array, bolsaTrabajo : Array},
    nombres : String,
    rut : {type : String, default : '-'},
    telefono : String,
    cargo : {type : String, default : '-'},
    wpTags : Array,
    wpTagsId : Array,
    activo : {type : Boolean, default : false},
    activationCode : String,
    CustomerCode : String,
    ContractCode : Array,
    locked : {type : Boolean, default : false}, 
    failedAttemps : {type : Number, default : 0},
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date},
    updatedBy : String
});
module.exports = mongoose.model('usuario', usuarioSchema);