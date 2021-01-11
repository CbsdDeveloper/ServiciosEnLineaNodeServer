'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const permitsCtrl = {
    activities: require('../controllers/permits/controller.activities'),
    taxes: require('../controllers/permits/controller.taxes'),
    ciiu: require('../controllers/permits/controller.ciiu'),
    entities: require('../controllers/permits/controller.entities'),
    locals: require('../controllers/permits/controller.locals'),
    employees: require('../controllers/permits/controller.employees'),
    selfInspections: require('../controllers/permits/controller.selfInspections'),
    permits: require('../controllers/permits/controller.permits'),
    duplicates: require('../controllers/permits/controller.duplicates'),

    schema: require('../controllers/controller.permits.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/aconomic/activities', permitsCtrl.activities.paginationEntity);
router.get('/taxes', permitsCtrl.taxes.paginationEntity);
router.get('/ciiu', permitsCtrl.ciiu.paginationEntity);
router.get('/entities', permitsCtrl.entities.paginationEntity);
router.get('/economicActivities', permitsCtrl.locals.paginationEntity);
router.get('/selfInspections', permitsCtrl.selfInspections.paginationEntity);
router.get('/anuals/permits', permitsCtrl.permits.paginationEntity);
router.get('/anuals/permits/localId', permitsCtrl.permits.paginateByLocal);
router.get('/duplicates', permitsCtrl.duplicates.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
// ENTIDADES
router.post('/entities/session/summary', permitsCtrl.entities.getSummaryByEntity);
router.get('/entities/resumen/:entityRuc', permitsCtrl.entities.summaryByRuc);
router.get('/entities/:entityRuc', permitsCtrl.entities.findByEntity);
router.post('/entities/detail/entityId', permitsCtrl.entities.findById);
router.post('/entities/login', permitsCtrl.entities.findByRUC);
router.post('/entities/enitiyByRUC', permitsCtrl.entities.findByRUC);
router.put('/entities/terms/accept', permitsCtrl.entities.acceptTermsByEntity);
// ACTIVIDADES COMERCIALES (15)
router.get('/commercialActivities', permitsCtrl.activities.findCommercialActivities);
// ACTIVIDADES ECONOMICAS (LOCALES)
router.post('/locals/localId', permitsCtrl.locals.findById);
router.post('/locals/detail/localId', permitsCtrl.locals.detailById);
router.put('/locals', permitsCtrl.locals.updateEntity);
router.post('/locals/list/entityId', permitsCtrl.locals.findByEntityId);
router.post('/employees/localId', permitsCtrl.employees.findByLocal);
router.put('/employees', permitsCtrl.employees.updateEntity);
router.delete('/employees/:employeeId', permitsCtrl.employees.deleteEntity);
router.delete('/employees/localId/all/:localId', permitsCtrl.employees.deleteByLocal);
// AUTOINSPECCIONES
router.post('/entity/detail/selfInspectionId', permitsCtrl.selfInspections.findBySelfInspectionId);
// PERMISOS DE FUNCIONAMIENTO
router.post('/permits/list/localId', permitsCtrl.permits.findByLocalId);
router.post('/permits/list/selfInspectionId', permitsCtrl.permits.findBySelfInspectionId);

/*
* CONTROLLERS DE SCHEMAS
*/
router.post('/ciiu', permitsCtrl.schema.findCiiuByActivity);
router.post('/permitsByLocal', permitsCtrl.schema.findPermitsByLocal);
router.post('/permits/localId', permitsCtrl.schema.findPermitsByLocal);

// EXPORTAR MODULO
module.exports = router;