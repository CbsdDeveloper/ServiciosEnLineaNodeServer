'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const administrativeCtrl = {
    seres:              require('../controllers/administrative/archive/controller.series'),
    periods:            require('../controllers/administrative/archive/controller.periods'),
    pseries:            require('../controllers/administrative/archive/controller.periods.series'),

    shelvings:          require('../controllers/administrative/archive/controller.shelvings'),
    boxes:              require('../controllers/administrative/archive/controller.boxes'),
    folders:            require('../controllers/administrative/archive/controller.folders'),
    
    edoc:               require('../controllers/administrative/edocumentation/controller.documentation'),
    
    typeMinorTools:     require('../controllers/administrative/gservices/controller.minortools.categories'),
    minorTools:         require('../controllers/administrative/gservices/controller.minortools'),
    minorMaintenances:  require('../controllers/administrative/gservices/controller.minortools.maintenances'),

    units: {
        unit:           require('../controllers/administrative/units/controller.units')
    },

    maintenance: {
        order:           require('../controllers/administrative/gservices/controller.maintenanceorder')
    },

    schema:             require('../controllers/controller.administrative.js')
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

router.get('/edocumentation/inbox/all', administrativeCtrl.edoc.paginationEntity);
router.get('/edocumentation/inbox', administrativeCtrl.edoc.paginationEntityBySession);
router.get('/edocumentation/deleted/all', administrativeCtrl.edoc.paginationEntityDeleted);
// SERVICIOS GENERALES
    // MANTENIMIENTO DE HERRAMIENTAS
router.get('/gservices/minortools/types', administrativeCtrl.typeMinorTools.paginationEntity);
router.get('/gservices/minortools', administrativeCtrl.minorTools.paginationEntity);
router.get('/gservices/minortools/maintenances', administrativeCtrl.minorMaintenances.paginationEntity);
// UNIDADES
router.get('/units/units', administrativeCtrl.units.unit.paginationEntity);

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
router.delete('/edocumentation/deleteRecipient/byId', administrativeCtrl.edoc.deleteRecipient);
router.delete('/edocumentation/delete/byeDocId', administrativeCtrl.edoc.deleteEntity);
router.delete('/edocumentation/restore/byeDocId', administrativeCtrl.edoc.restoreEntity);

// SERVICIOS GENERALES
    // MANTENIMIENTO DE HERRAMIENTAS MENORES
router.get('/gservices/minortools/types/list', administrativeCtrl.typeMinorTools.listEntity);
router.post('/gservices/minortools/types', administrativeCtrl.typeMinorTools.newEntity);
router.put('/gservices/minortools/types', administrativeCtrl.typeMinorTools.updateEntity);

router.get('/gservices/minortools/list', administrativeCtrl.minorTools.listEntity);
router.post('/gservices/minortools', administrativeCtrl.minorTools.newEntity);
router.put('/gservices/minortools', administrativeCtrl.minorTools.updateEntity);

router.post('/gservices/minortools/maintenances/detailById', administrativeCtrl.minorMaintenances.detailEntityById);
router.post('/gservices/minortools/maintenances/insert/tools', administrativeCtrl.minorMaintenances.insertToolsToMaintenance);
router.delete('/gservices/minortools/maintenances/delete/tools', administrativeCtrl.minorMaintenances.deleteToolsToMaintenance);

    // ORDENES DE MANTENIMIENTO
router.post('/gservices/maintenances/order/detailById', administrativeCtrl.maintenance.order.detailEntityById);


// UNIDADES



/*
* CONTROLLERS DE SCHEMAS
*/
router.get('/units', administrativeCtrl.schema.findAllUnits);

// EXPORTAR MODULO
module.exports = router;