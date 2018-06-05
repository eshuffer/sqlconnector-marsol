var express = require('express');
var bootstrap = require('./bootstrap/initApp');

//const test = require('./api/controllers/usuariosController');
const test2 = require('./api/controllers/equiposController');
const test3 = require('./api/controllers/contratosController');
const app = express();
bootstrap(app);

app.set('port', 2680);

const server = app.listen(app.get('port'), ()=>{
    console.log('Server started in port --> '+ server.address().port);
});

setTimeout(()=>{
    test2.syncEquipos();
    //test3.syncContracs();
},5000);

// setTimeout(()=>{
//     test2.getEquipos();
//     //test3.getContracts();
// },6000);