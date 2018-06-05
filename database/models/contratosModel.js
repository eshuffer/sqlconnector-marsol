const mongoose = require('mongoose');

const contratosSchema = new mongoose.Schema({
    ContractID : String,
    CustomerCode : String,
    EndDate : Date,
    syncedAt : {type : Date, default : new Date}
});

module.exports = mongoose.model('contrato', contratosSchema);
