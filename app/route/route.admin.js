'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const adminCtrl = {
    labels:         require('../controllers/admin/controller.labels'),
    reports:        require('../controllers/admin/controller.reports'),
    parameters:     require('../controllers/admin/controller.parameters'),
    webmail:        require('../controllers/admin/controller.webmail'),
    profiles:       require('../controllers/admin/controller.profiles'),
    users:          require('../controllers/admin/controller.users'),

    schema:          require('../controllers/controller.admin.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/labels', adminCtrl.labels.paginationEntity);
router.get('/parameters', adminCtrl.parameters.paginationEntity);
router.get('/webmail', adminCtrl.webmail.paginationEntity);
router.get('/reports', adminCtrl.reports.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
router.get('/profiles', adminCtrl.profiles.findAll);
router.get('/profiles/:id', adminCtrl.profiles.findById);
router.get('/users', adminCtrl.users.findAll);

/*
* CONTROLLERS DE SCHEMAS
*/
router.get('/users/prevention', adminCtrl.schema.findInspectorsPrevention);

// EXPORTAR MODULO
module.exports = router;