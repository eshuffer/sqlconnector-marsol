var express = require('express');
var bootstrap = require('./bootstrap/initApp');

//const test = require('./api/controllers/usuariosController');
const test2 = require('./api/controllers/equiposController');
const app = express();
bootstrap(app);

app.set('port', 2680);

const server = app.listen(app.get('port'), ()=>{
    console.log('Server started in port --> '+ server.address().port);
});

setTimeout(()=>{
    test2.getEquipos();
},5000);