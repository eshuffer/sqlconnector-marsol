const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const connection = require('../../database/connection').db;

const funciones = {
    syncUsuarios(){
        let index = 0;
        let ObjArray = [];
        //let count = 0;
        request = new Request('SELECT * FROM OCPR', (err,rowCount,rows)=>{
            if(err){
                console.log('Error Selecting OCPR');
                console.log(err);
                return;
            }
            console.log(rowCount);
            console.log(JSON.stringify(rows));
            console.log(ObjArray);
        });

        
        request.on('row', (colunms)=>{
            //console.log('In this');

            ObjArray[index] = {};
            for(let items of colunms){
                //console.log(items);
                if(items.metadata.colName == 'CntctCode' || items.metadata.colName == 'CardCode' || items.metadata.colName == 'Name' || items.metadata.colName == 'Position' || items.metadata.colName == 'Address' || items.metadata.colName == 'Tel1' || items.metadata.colName == 'Tel2' || items.metadata.colName == 'Cellolar' || items.metadata.colName == 'Fax' || items.metadata.colName == 'E_MailL' || items.metadata.colName == 'Title'){
                    ObjArray[index][items.metadata.colName] = items.value;
                }
            }
            //console.log(index)
            index++
        });


        // request.on('done', (rowCount, more, rows)=>{
        //     console.log('Req Done...');
        //     console.log(rows)
        // })
        connection.execSql(request);
    },
    validateEmail(email) 
    {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

module.exports = funciones;