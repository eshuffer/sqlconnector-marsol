const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const connection = require('../../database/connection').db;

const EquiposModel = require('../../database/models/equiposModel');

const funciones = {
    syncEquipos(){
        
        let index = 0;
        let ObjArray = [];

        request = new Request('SELECT customer as CustomerCode, custmrName as CustomerName, internalSN, itemCode, itemName, street, city, county, instLction  FROM OINS;', (err,rowCount,rows)=>{
            if(err){
                console.log('Error Selecting Equipos');
                console.log(err);
                return;
            }
            //console.log(rowCount);
            //console.log(ObjArray[0]);
            EquiposModel.insertMany(ObjArray, {ordered : false},(err,result)=>{
                if(err){
                    return console.log('Error InsertMany Equipos: '+JSON.stringify(err));
                }
                console.log('InsertMany Equipos OK!');
            });
        });

        request.on('row', (colunms)=>{


            ObjArray[index] = {};
            for(let items of colunms){

                if(items.metadata.colName == 'CustomerCode'){
                    ObjArray[index]['CustomerCode'] = items.value;
                }
                if(items.metadata.colName == 'CustomerName'){
                    ObjArray[index]['CustomerName'] = items.value;
                }
                if(items.metadata.colName == 'internalSN'){
                    ObjArray[index]['serialInterno'] = items.value;
                }
                if(items.metadata.colName == 'itemsCode'){
                    ObjArray[index]['codigoitems'] = items.value;
                }
                if(items.metadata.colName == 'itemsName'){
                    ObjArray[index]['nombre'] = items.value;
                }
                if(items.metadata.colName == 'CustomerName'){
                    ObjArray[index]['CustomerName'] = items.value;
                }
                if(items.metadata.colName == 'street'){
                    ObjArray[index]['direccion'] = items.value;
                }
                if(items.metadata.colName == 'city'){
                    ObjArray[index]['ciudad'] = items.value;
                }
                if(items.metadata.colName == 'county'){
                    ObjArray[index]['comuna'] = items.value;
                }
                if(items.metadata.colName == 'instLction'){
                    ObjArray[index]['lugarInstalacion'] = items.value;
                }
            }
            
            index++
        });

        connection.execSql(request);

    }
}

module.exports = funciones;