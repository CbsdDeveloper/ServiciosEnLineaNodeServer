'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const administrativeCtrl = {
    shelvings:              require('../controllers/administrative/archive/controller.shelvings'),
    boxes:                  require('../controllers/administrative/archive/controller.boxes'),
    folders:                require('../controllers/administrative/archive/controller.folders'),
    schema: require('../controllers/controller.administrative.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/archive/shelvings', administrativeCtrl.shelvings.paginationEntity);
router.get('/archive/boxes', administrativeCtrl.boxes.paginationEntity);
router.get('/archive/folders', administrativeCtrl.folders.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/

/*
* CONTROLLERS DE SCHEMAS
*/
router.get('/units', administrativeCtrl.schema.findAllUnits);

// EXPORTAR MODULO
module.exports = router;