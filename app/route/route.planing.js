'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const planingCtrl = {
    programspoa: require('../controllers/planing/controller.programspoa'),
    poa: require('../controllers/planing/controller.programspoa'),
    poaprojects: require('../controllers/planing/controller.poaprojects')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/

/*
* CONTROLLERS DE MODELOS
*/
router.get('/poa/programs/list', planingCtrl.programspoa.findAll);
router.post('/poa/projects/list/poaId', planingCtrl.poaprojects.findByPoa);

/*
* CONTROLLERS DE SCHEMAS
*/

// EXPORTAR MODULO
module.exports = router;