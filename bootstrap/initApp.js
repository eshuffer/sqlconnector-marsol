const dbInit = require('../database/connection');
const mongoConnect = require('../database/mongoConnection');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('../api/routes/routes');

const boot = function(app){
    app.use(require('morgan')('dev'));
    app.use(bodyParser.json({limit : '50mb'}));
    app.use(bodyParser.urlencoded({extended : false, limit : '50mb'}));
    app.use(express.static('static'))
    app.use((req,res,next)=>{
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token, x-access-rut');
      if ('OPTIONS' == req.method) {
        res.sendStatus(200);
      }
      else {
        next();
      }
    });
    //dbInit.init();
    mongoConnect();
    routes(app);
}

module.exports = boot;