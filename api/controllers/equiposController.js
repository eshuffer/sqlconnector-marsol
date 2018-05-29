const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const connection = require('../../database/connection').db;

const funciones = {
    getEquipos(){
        
        let index = 0;
        let ObjArray = [];

        request = new Request('SELECT T0.insID, T0.Customer, T0.CustmrName, T0.Status, T1.* FROM [dbo].[OINS]  T0 INNER JOIN CTR1 T1 ON T0.[insID] = T1.[InsID]', (err,rowCount,rows)=>{
            if(err){
                console.log('Error Selecting OCPR');
                console.log(err);
                return;
            }
            console.log(rowCount);

        });

        request.on('row', (colunms)=>{


            ObjArray[index] = {};
            for(let items of colunms){

                if(items.metadata.colName == 'InternalSN' || items.metadata.colName == 'ItemCode' || items.metadata.colName == 'ItemName' || items.metadata.colName == 'StartDate' || items.metadata.colName == 'EndDate' || items.metadata.colName == 'TermDate'){
                    ObjArray[index][items.metadata.colName] = items.value;
                }
            }
            
            index++
        });

        connection.execSql(request);

    }
}

module.exports = funciones;