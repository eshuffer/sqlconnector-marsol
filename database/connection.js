const Connection = require('tedious').Connection;

const config = {
    userName : 'sa',
    password : 'SAPB1Admin',
    server : 'localhost',
    options : {
        database : 'Marsol'
    }
};

const connection = new Connection(config);

        connection.on('connect', (err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log('Connection to SQLServer OK');
        });

const funciones = {
    init(){
        

    }
}



module.exports = {init : funciones.init, db : connection}