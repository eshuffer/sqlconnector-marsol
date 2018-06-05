const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const connection = require('../../database/connection').db;

const ContratosModel = require('../../database/models/contratosModel');

const moment = require('moment');

const funciones = {
    syncContracs(){
        console.log('start')
        let index = 0;
        let ObjArray = [];
        
        request = new Request("SELECT ContractID, CstmrCode, EndDate FROM OCTR;"
        , (err,rowCount,rows)=>{
            if(err){
                console.log('Error Selecting OCTR Contract');
                console.log(err);
                return;
            }
            // console.log(rowCount);
            // console.log(ObjArray.length)
            // console.log(ObjArray[0]);
            ContratosModel.insertMany(ObjArray, {ordered : false}, (err,result)=>{
                if(err){
                    return console.log('Insert Many err: '+JSON.stringify(err));
                }
                console.log('Contratos InsertMany OK!');
            });
        });

        request.on('row', (colunms)=>{
            ObjArray[index] = {};
            for(let items of colunms){
                if(items.metadata.colName == 'ContractID'){
                    ObjArray[index]['ContractID'] = String(items.value);
                }
                if(items.metadata.colName == 'CstmrCode'){
                    ObjArray[index]['CustomerCode'] = items.value;
                }
                if(items.metadata.colName == 'EndDate'){
                    ObjArray[index]['EndDate'] = moment(items.value)._d;
                } 
            }
            index++  
        });

        connection.execSql(request);
        
    }
}

module.exports = funciones;