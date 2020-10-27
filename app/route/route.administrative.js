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
    
    edoc:           require('../controllers/administrative/edocumentation/controller.documentation'),

    schema:         require('../controllers/controller.administrative.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/archive/series', administrativeCtrl.seres.paginationEntity);
router.get('/archive/periods', administrativeCtrl.periods.paginationEntity);
router.get('/archive/reviews/periods', administrativeCtrl.pseries.paginationEntity);
router.get('/archive/reviews/periods/details', administrativeCtrl.pseries.paginationEntityByPeriodId);

router.get('/archive/shelvings', administrativeCtrl.shelvings.paginationEntity);
router.get('/archive/boxes', administrativeCtrl.boxes.paginationEntity);
router.get('/archive/folders', administrativeCtrl.folders.paginationEntity);

router.get('/edocumentation/inbox', administrativeCtrl.edoc.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
router.post('/archive/periods/series/byperiodid', administrativeCtrl.pseries.recordsByPeriodId);
router.post('/archive/review/detail/pserieId', administrativeCtrl.pseries.detailReviewById);
// DOCUMENTACION ELECTRONICA
router.post('/edocumentation/compose/draft', administrativeCtrl.edoc.composeDraft);
router.post('/edocumentation/detail/byMessageId', administrativeCtrl.edoc.detailByEntityId);
router.put('/edocumentation/setSender/byMessageId', administrativeCtrl.edoc.setSender);
router.put('/edocumentation/setRecipients/byMessageId', administrativeCtrl.edoc.setRecipients);


/*
* CONTROLLERS DE SCHEMAS
*/
router.get('/units', administrativeCtrl.schema.findAllUnits);

// EXPORTAR MODULO
module.exports = router;