'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const subjefatureCtrl = {
    attended:                   require('../controllers/subjefature/controller.attended'),
    partSupplies:               require('../controllers/subjefature/controller.aphsupplies'),
    aphSupplies:                require('../controllers/subjefature/aph/controller.aph.supplies'),
    aphSupplycontrol:           require('../controllers/subjefature/aph/controller.aph.supplycontrol'),
    aphSupplyMovements:         require('../controllers/subjefature/aph/controller.aph.supplycontrolmovements'),

    schema:    require('../controllers/controller.subjefature.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
// SUBJEFATURA
router.get('/aph/supplies/list', subjefatureCtrl.aphSupplies.paginationEntity);
router.get('/aph/supplies/all/stock/list', subjefatureCtrl.aphSupplies.paginationStockSupplies);
router.get('/aph/supplies/stock/wineries/list', subjefatureCtrl.aphSupplies.paginationSuppliesStockWineries);
router.get('/aph/supplies/stock/stations/list', subjefatureCtrl.aphSupplies.paginationSuppliesStockStations);
router.get('/aph/control/supplies', subjefatureCtrl.aphSupplycontrol.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
// SUBJEFATURA
router.get('/parts/attended/partId', subjefatureCtrl.attended.attendedByPrtId);
router.post('/parts/attended/partId/new', subjefatureCtrl.attended.newAttendedByPrtId);
router.delete('/parts/attended/partId/remove', subjefatureCtrl.attended.removeAttendedByPrtId);
router.get('/parts/supplies/partId', subjefatureCtrl.partSupplies.suppliesByPrtId);
router.post('/parts/supplies/partId/new', subjefatureCtrl.partSupplies.newSupplyByPrtId);
router.delete('/parts/supplies/partId/remove', subjefatureCtrl.partSupplies.removeSupplyByPrtId);
router.post('/aph/suppliest', subjefatureCtrl.aphSupplies.newEntity);
router.put('/aph/suppliest', subjefatureCtrl.aphSupplies.updateEntity);
// APH
router.post('/aph/suppliesinventory/movements/list', subjefatureCtrl.aphSupplyMovements.suppliesByInventoryId);
router.post('/aph/supplies/inventory/single', subjefatureCtrl.aphSupplyMovements.insertInventory);

/*
* CONTROLLERS DE SCHEMAS
*/
router.post('/codesByNature', subjefatureCtrl.schema.findCodesByNature);

// EXPORTAR MODULO
module.exports = router;