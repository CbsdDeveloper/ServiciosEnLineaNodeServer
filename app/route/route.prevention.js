'use strict';
const express = require("express");
const router = express.Router();

const preventionCtrl = {
    // INSPECCIONES
    inspections:                require('../controllers/prevention/inspections/controller.inspections'),
    // PRORROGAS
    extensions:                 require('../controllers/prevention/inspections/controller.extensions'),
    // PLANES DE AUTOPROTECCION
    plans:                      require('../controllers/prevention/selfprotectionplans/controller.plans'),
    selfProtectionAnnexes:      require('../controllers/prevention/selfprotectionplans/controller.selfProtection.annexes'),
    selfProtectionFactors:      require('../controllers/prevention/selfprotectionplans/controller.selfProtection.factors'),
    selfProtectionPrevention:   require('../controllers/prevention/selfprotectionplans/controller.selfProtection.prevention'),
    selfProtectionMaintenance:  require('../controllers/prevention/selfprotectionplans/controller.selfProtection.maintenance'),
    selfProtectionMeseri:       require('../controllers/prevention/selfprotectionplans/controller.selfProtection.meseri'),
    brigades:                   require('../controllers/prevention/selfprotectionplans/controller.brigades'),
    brigadists:                 require('../controllers/prevention/selfprotectionplans/controller.brigadists'),
    // PLANES DE BIOSEGURIDAD
    srcBiosecurity:             require('../controllers/prevention/biosecurity/controller.covid'),
    // CAPACITACIONES CIUDADANAS
    trainings:                  require('../controllers/prevention/trainings/controller.trainings'),
    stands:                     require('../controllers/prevention/trainings/controller.stands'),
    visits:                     require('../controllers/prevention/trainings/controller.visits'),
    simulations:                require('../controllers/prevention/trainings/controller.simulations'),
    // PERMISOS DE USO DE GLP
    tglp:                       require('../controllers/prevention/glp/controller.transport'),
    // SCHEMA
    schema:                     require('../controllers/controller.prevencion.js')
};

/*
 * SERVICIOS PARA PAGINAR RESULTADOS
 */
// UNIDAD DE PREVENCION E INGENIERIA DEL FUEGO
router.get('/inspections/inspections', preventionCtrl.inspections.paginationEntity);
router.get('/inspections/extensions', preventionCtrl.extensions.paginationEntity);
router.get('/inspections/selfprotections', preventionCtrl.plans.paginationEntity);
router.get('/glp/transport', preventionCtrl.tglp.paginationEntity);
router.get('/plans/selfprotections/localId', preventionCtrl.plans.paginateByLocal);

/*
 * MODELOS
 */
// INSPECCIONES
router.post('/inspections/list/localId', preventionCtrl.inspections.findByLocalId);
// PRORROGAS
router.post('/extensions/list/localId', preventionCtrl.extensions.findByLocalId);
// PLAN DE AUTOPROTECCION
router.post('/selfprotections/detail/byId', preventionCtrl.plans.detailById);
router.post('/plans/list/localId', preventionCtrl.plans.findByLocalId);
router.post('/plans/planById', preventionCtrl.plans.findById);
router.put('/plans/selfproteccion', preventionCtrl.plans.updateEntity);
router.put('/plans/selfproteccion/relations', preventionCtrl.plans.updateResourcesEntity);
router.post('/plans/selfProtectionAnnexesByPlan', preventionCtrl.selfProtectionAnnexes.findSelfProtectionAnnexesByPlan);
router.post('/plans/selfProtectionFactorsByPlan', preventionCtrl.selfProtectionFactors.findSelfProtectionFactorsByPlan);
router.post('/plans/selfProtectionPreventionByPlan', preventionCtrl.selfProtectionPrevention.findSelfProtectionPreventionByPlan);
router.post('/plans/selfProtectionMaintenanceByPlan', preventionCtrl.selfProtectionMaintenance.findSelfProtectionMaintenanceByPlan);
router.post('/plans/findSelfProtectionMaintenanceApplyByPlan', preventionCtrl.selfProtectionMaintenance.findSelfProtectionMaintenanceApplyByPlan);
router.post('/plans/selfProtectionMeseriByPlan', preventionCtrl.selfProtectionMeseri.findSelfProtectionMeseriByPlan);
router.post('/brigades', preventionCtrl.brigades.insertEntity);
router.put('/brigades', preventionCtrl.brigades.insertEntity);
router.delete('/brigades/:brigadeId', preventionCtrl.brigades.deleteEntity);
router.post('/brigades/localId', preventionCtrl.brigades.findByLocal);
router.post('/brigadists', preventionCtrl.brigadists.insertBrigadists);
router.post('/brigadists/brigadeId', preventionCtrl.brigadists.findByBrigade);
// BIOSEGURIDAD - COVID19
router.post('/biosecurity/covid19/forms', preventionCtrl.srcBiosecurity.findResourcesByBiosecurity);
router.post('/biosecurity/covid19/register', preventionCtrl.srcBiosecurity.insertEntity);
// CAPACITACIONES CIUDADANAS
router.post('/trainings/list/entityId', preventionCtrl.trainings.findByEntityId);
router.post('/stands/list/entityId', preventionCtrl.stands.findByEntityId);
router.post('/visits/list/entityId', preventionCtrl.visits.findByEntityId);
router.post('/simulations/list/entityId', preventionCtrl.simulations.findByEntityId);
// TRANSPORTE DE GLP
router.post('/glp/transport/detail/byId', preventionCtrl.tglp.findById);
router.post('/glp/transport/review/byId', preventionCtrl.tglp.reviewById);

/*
 * CONTROLLERS DE SCHEMAS
 */
// PREVENCION
router.post('/training/participants/entityId', preventionCtrl.schema.findParticipantsByEntityId);
router.post('/training/participants/trainingId', preventionCtrl.schema.findParticipantsByTrainingId);
router.post('/inspectionsByEntity', preventionCtrl.schema.inspectionsByEntity);
router.post('/training/history/entityId', preventionCtrl.schema.findTrainingsByEntity);

// EXPORTAR MODULO
module.exports = router;