'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const financialCtrl = {
    contractingprocedures: require('../controllers/financial/controller.contractingprocedures'),
    budgetclassifier: require('../controllers/financial/controller.budgetclassifier'),
    retentionclassifier: require('../controllers/financial/controller.retentionclassifier'),
    accountcatalog: require('../controllers/financial/controller.accountcatalog'),
    programs: require('../controllers/financial/controller.programs'),
    subprograms: require('../controllers/financial/controller.subprograms'),
    projects: require('../controllers/financial/controller.projects'),
    activities: require('../controllers/financial/controller.activities'),
    entities: require('../controllers/financial/controller.entities'),
    typedocuments: require('../controllers/financial/controller.typedocuments'),

    schema: require('../controllers/controller.financial')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/budgetclassifier', financialCtrl.budgetclassifier.paginationEntity);
router.get('/retentionclassifier', financialCtrl.retentionclassifier.paginationEntity);
router.get('/accountcatalog', financialCtrl.accountcatalog.paginationEntity);
router.get('/programs', financialCtrl.programs.paginationEntity);
router.get('/subprograms', financialCtrl.subprograms.paginationEntity);
router.get('/projects', financialCtrl.projects.paginationEntity);
router.get('/activities', financialCtrl.activities.paginationEntity);
router.get('/entities', financialCtrl.entities.paginationEntity);
router.get('/typedocuments', financialCtrl.typedocuments.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
router.get('/priorcontrol/contractingprocedures', financialCtrl.contractingprocedures.findAll);
router.get('/priorcontrol/processcontracts/processId', financialCtrl.contractingprocedures.findById);

/*
* CONTROLLERS DE SCHEMAS
*/
router.get('/priorcontrol/requirements/list', financialCtrl.schema.findRequirementsForContractingProcedures);

// EXPORTAR MODULO
module.exports = router;