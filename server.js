// DECLARACIÓN DE PROYECTOS
// var compression = require('compression');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(compression());

// INSTANCIA DE CONEXIÓN A BASE DE DATOS
const db = require('./app/config/db.config.js');
  
// force: true ELIMINARÁ LAS TABLAS EXISTENTES
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// INSTANCIA DE RUTAS
require('./app/route/route.main.js')(app);
 
// INICIALIZACIÓN DE SERVIDOR
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
});