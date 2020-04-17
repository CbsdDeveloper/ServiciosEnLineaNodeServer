// DECLARACIÓN DE PROYECTOS
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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
var server = app.listen((process.env.PORT || 81), function () {

  var host = server.address().address;
  var port = server.address().port;
 
  console.log("\n App listening at http://%s:%s", host, port);
  
  // pm2 start server --env production
});