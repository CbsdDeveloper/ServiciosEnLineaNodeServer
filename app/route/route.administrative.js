'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const administrativeCtrl = {
    seres:          require('../controllers/administrative/archive/controller.series'),
    periods:        require('../controllers/administrative/archive/controller.periods'),
    pseries:        require('../controllers/administrative/archive/controller.periods.series'),

    shelvings:      require('../controllers/administrative/archive/controller.shelvings'),
    boxes:          require('../controllers/administrative/archive/controller.boxes'),
    folders:        require('../controllers/administrative/archive/controller.folders'),
    schema:         require('../controllers/controller.administrative.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/archive/series', administrativeCtrl.seres.paginationEntity);
router.get('/archive/periods', administrativeCtrl.periods.paginationEntity);

router.get('/archive/shelvings', administrativeCtrl.shelvings.paginationEntity);
router.get('/archive/boxes', administrativeCtrl.boxes.paginationEntity);
router.get('/archive/folders', administrativeCtrl.folders.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
router.post('/archive/periods/series/byperiodid', administrativeCtrl.pseries.recordsByPeriodId);


/*
* CONTROLLERS DE SCHEMAS
*/
router.get('/units', administrativeCtrl.schema.findAllUnits);

// EXPORTAR MODULO
module.exports = router;