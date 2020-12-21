'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const planingCtrl = {
    programspoa:        require('../controllers/planing/controller.programspoa'),
    poa:                require('../controllers/planing/controller.poa'),
    reform:             require('../controllers/planing/controller.reforms'),
    poaprojects:        require('../controllers/planing/controller.poaprojects')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/poa/programs/pagination', planingCtrl.programspoa.paginationEntity);
router.get('/poa/pagination', planingCtrl.poa.paginationEntity);
router.get('/poa/detail/projects/pagination', planingCtrl.poaprojects.paginationEntity);
router.get('/poa/reforms/pagination', planingCtrl.reform.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
router.post('/poa/detail/byId', planingCtrl.poa.findById);
router.put('/poa/reform/byId', planingCtrl.reform.updateEntity);
router.get('/poa/programs/list', planingCtrl.programspoa.findAll);
router.post('/poa/projects/list/reformId', planingCtrl.poaprojects.findByReform);

/*
* CONTROLLERS DE SCHEMAS
*/

// EXPORTAR MODULO
module.exports = router;