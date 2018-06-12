const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const connection = require('../../database/connection').db;

const funciones = {
    syncUsuarios(){
        let index = 0;
        let ObjArray = [];
        //let count = 0;
        request = new Request("SELECT CardCode as CustomerCode, CardName as Nombre, E_mail as OCRDMail, PCName=STUFF((SELECT '%'+Name FROM OCPR WHERE CardCode = P.CardCode FOR XML PATH('')),1,1,''), PCPosition=STUFF((SELECT '%'+Position+'??'+Name FROM OCPR WHERE CardCode = P.CardCode FOR XML PATH('')),1,1,''), PCDireccion=STUFF((SELECT '%'+Address+'??'+Name FROM OCPR WHERE CardCode = P.CardCode FOR XML PATH('')),1,1,''), PCEmail=STUFF((SELECT '%'+OC.E_MailL+'??'+Name FROM OCPR OC WHERE CardCode = P.CardCode FOR XML PATH('')),1,1,''), Contratos=STUFF((SELECT '%'+CAST(OCTR.ContractID as varchar(35)) FROM OCTR WHERE CstmrCode = P.CardCode FOR XML PATH('')),1,1,'') FROM OCRD P WHERE CardType = 'C' AND ISNULL(P.E_Mail, 'X') != 'X';", (err,rowCount,rows)=>{
            if(err){
                console.log('Error Selecting OCPR');
                console.log(err);
                return;
            }
            console.log(rowCount);
            //console.log(JSON.stringify(rows));
            
        });

        usuarios = [];
        request.on('row', (colunms)=>{
            //console.log('In this');
            tempUsers = [];
            
            auxObject = {};
            for(let items of colunms){
                    auxObject[items.metadata.colName] = items.value;
            }
            let rowValid = true;
            let PCName = null;

            if(auxObject.PCName !== null){
                /*
                PCName = auxObject.PCName.split('%');
                for(let names of PCName){
                    //if()
                }
                tempUser.push({
                    nombres : 
                })
                */
            }
            if(auxObject.PCPosition !== null){

            }

            if(rowValid){
                index++
            }
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