'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const tthhCtrl = {
    wineries:                   require('../controllers/tthh/institution/controller.wineries'),
    leaderships:                require('../controllers/tthh/institution/controller.leaderships'),
    jobs:                       require('../controllers/tthh/institution/controller.jobs'),
    workdays:                   require('../controllers/tthh/settings/controller.workdays'),
    typeadvances:               require('../controllers/tthh/settings/controller.typeadvances'),
    typecontracts:              require('../controllers/tthh/settings/controller.typecontracts'),
    occupationalgroups:         require('../controllers/tthh/settings/controller.occupationalgroups'),
    staff:                      require('../controllers/tthh/controller.staff'),
    ppersonal:                  require('../controllers/tthh/controller.ppersonal'),
    operators:                  require('../controllers/tthh/controller.operators'),
    biometric:                  require('../controllers/tthh/attendance/controller.biometric'),
    biometricPeriods:           require('../controllers/tthh/attendance/controller.biometricPeriods'),
    biometricMarkings:          require('../controllers/tthh/attendance/controller.biometricMarkings'),
    arrears:                    require('../controllers/tthh/attendance/controller.arrears'),
    ranches:                    require('../controllers/tthh/attendance/controller.ranches'),
    absences:                   require('../controllers/tthh/attendance/controller.absences'),
    stations:                   require('../controllers/tthh/institution/controller.stations'),
    platoons:                   require('../controllers/tthh/institution/controller.platoons'),
    academic:                   require('../controllers/tthh/controller.academicTraining'),
    medicines:                  require('../controllers/tthh/md/controller.medicines'),
    medicalrestRecipient:       require('../controllers/tthh/md/controller.medicalrest.recipients'),

    sso: {
        psychosocial: {
            forms:              require('../controllers/tthh/sos/controller.psychosocial.forms'),
            sections:           require('../controllers/tthh/sos/controller.psychosocial.sections'),
            evaluations:        require('../controllers/tthh/sos/controller.psychosocial.evaluations'),
            test:               require('../controllers/tthh/sos/controller.psychosocial.test'),
        },
        vrescue: {
            categoriesequipment: require('../controllers/tthh/sos/controller.vrescue.categoriesequipments'),
            equipments:          require('../controllers/tthh/sos/controller.vrescue.equipments'),
            history:             require('../controllers/tthh/sos/controller.vrescue.history'),
        },
        fextinguisher: {
            list:               require('../controllers/tthh/sos/controller.fextinguisher.list'),
            inspections:        require('../controllers/tthh/sos/controller.fextinguisher.inspections'),
            reviews:            require('../controllers/tthh/sos/controller.fextinguisher.list'),
        }
    },

    surveysEvaluations:         require('../controllers/tthh/surveys/controller.evaluations'),
    surveysEvaluationsStaff:    require('../controllers/tthh/surveys/controller.staff.evaluations'),

    schema:           require('../controllers/controller.tthh.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
// DIRECCION DE TALENTO HUMANO
router.get('/institution/stations', tthhCtrl.stations.paginationEntity);
router.get('/institution/leaderships', tthhCtrl.leaderships.paginationEntity);
router.get('/operators/byLeadership', tthhCtrl.operators.paginationByLeadership);
router.get('/staff/byLeadership', tthhCtrl.ppersonal.paginationByLeadership);
router.get('/institution/wineries/list', tthhCtrl.wineries.paginationEntity);
router.get('/workdays', tthhCtrl.workdays.paginationEntity);
router.get('/typeadvances', tthhCtrl.typeadvances.paginationEntity);
router.get('/typecontracts', tthhCtrl.typecontracts.paginationEntity);
router.get('/occupationalgroups', tthhCtrl.occupationalgroups.paginationEntity);
// CONTROL DE ASISTENCIA
router.get('/attendance/biometriccodes', tthhCtrl.biometric.paginationEntity);
router.get('/attendance/biometricperiods', tthhCtrl.biometricPeriods.paginationEntity);
router.get('/attendance/biometricmarkings', tthhCtrl.biometricMarkings.paginationEntity);
router.get('/attendance/biometricperiods/nomarkings', tthhCtrl.biometricMarkings.paginationNomarkingByPeriod);
router.get('/attendance/biometricperiods/staff', tthhCtrl.biometricMarkings.paginationStaffNomarkings);
router.get('/attendance/biometricperiods/staff/nomarkings', tthhCtrl.biometricMarkings.paginationNomarkingsByStaff);
router.get('/attendance/ranches', tthhCtrl.ranches.paginationEntity);
router.get('/attendance/arrears', tthhCtrl.arrears.paginationEntity);
router.get('/attendance/absences', tthhCtrl.absences.paginationEntity);
// DEP. MEDICO
router.get('/md/medicalrest/recipients/list', tthhCtrl.medicalrestRecipient.paginationEntity);
// RECATE VERTICAL
router.get('/sos/vrescue/categories/equipments/list', tthhCtrl.sso.vrescue.categoriesequipment.paginationEntity);
router.get('/sos/vrescue/equipments/list', tthhCtrl.sso.vrescue.equipments.paginationEntity);
router.get('/sos/vrescue/history/list', tthhCtrl.sso.vrescue.history.paginationEntity);
// INSPECCION DE EXTINTORES
router.get('/sos/fextinguisher/extinguishers/list', tthhCtrl.sso.fextinguisher.list.paginationEntity);
router.get('/sos/fextinguisher/extinguishers/inspections/list', tthhCtrl.sso.fextinguisher.inspections.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
// DIR. TALENTO HUMANO
router.get('/wineries', tthhCtrl.wineries.findAll);
router.get('/typeadvances/list', tthhCtrl.typeadvances.listEntity);
router.put('/typeadvances', tthhCtrl.typeadvances.updateEntity);
router.put('/typecontracts', tthhCtrl.typecontracts.updateEntity);
router.get('/workdays/list', tthhCtrl.workdays.findAll);
router.post('/workdays/detail', tthhCtrl.workdays.findByIdDetail);
router.put('/workdays', tthhCtrl.workdays.updateEntity);
router.get('/institution/leaderships/list', tthhCtrl.leaderships.findAllLeaderships);
router.get('/leaderships', tthhCtrl.leaderships.findAll);
router.get('/jobs', tthhCtrl.jobs.findAll);
router.get('/jobs/leaderships', tthhCtrl.jobs.findAllStaffByLeadership);
router.get('/stations', tthhCtrl.stations.findAll);
router.get('/stations/byId/:id', tthhCtrl.stations.findById);
router.get('/stations/platoons', tthhCtrl.platoons.findAllBySations);
router.post('/staff/requestEntity', tthhCtrl.staff.requestEntity);
router.get('/staff/active/list', tthhCtrl.staff.staffActiveList);
// CONTROL DE ASISTENCIA
router.put('/attendance/biometric/staff', tthhCtrl.staff.updateBiometricCode);
router.post('/attendance/biometricperiods', tthhCtrl.biometricPeriods.insertEntity);
router.put('/attendance/biometricperiods', tthhCtrl.biometricPeriods.updateEntity);
router.post('/attendance/biometricperiods/findById', tthhCtrl.biometricPeriods.findById);
router.post('/attendance/biometric/staff/markings/list', tthhCtrl.biometricMarkings.getInfoNomarkingsByStaffId);
router.put('/attendance/biometric/staff/markings', tthhCtrl.biometricMarkings.updateEntity);
router.put('/attendance/biometric/staff/markings/list', tthhCtrl.biometricMarkings.updateEntityList);
router.delete('/attendance/biometric/staff/markings/remove/periodId', tthhCtrl.biometricMarkings.deleteByPeriodoId);
// EVALUACIONES - SURVEYS
router.post('/surveys/evaluations/entityById', tthhCtrl.surveysEvaluations.findById);
router.post('/surveys/evaluations/questionnaire/questions', tthhCtrl.surveysEvaluations.questionnaireByEvaluation);
router.post('/surveys/evaluations/new/staff', tthhCtrl.surveysEvaluationsStaff.insertSurveyEvaluarion);
// DEP. MEDICO
router.get('/md/pharmacy/supplies', tthhCtrl.medicines.findAll);
router.get('/md/pharmacy/supplies/inventory', tthhCtrl.medicines.findInventory);
router.post('/md/pharmacy/supplies/inventory', tthhCtrl.medicines.insertInventory);
router.get('/md/pharmacy/supplies/stock', tthhCtrl.medicines.findStock);
router.post('/md/medicalrest/recipients/new', tthhCtrl.medicalrestRecipient.newRecipient);
router.delete('/md/medicalrest/recipients/remove', tthhCtrl.medicalrestRecipient.removeRecipientById);
// RIESGO PSICOSOCIAL
router.get('/sos/psychosocial/forms/list', tthhCtrl.sso.psychosocial.forms.findAll);
router.get('/sos/psychosocial/forms/list/active', tthhCtrl.sso.psychosocial.forms.findAllActive);
router.post('/sos/psychosocial/forms/entityById', tthhCtrl.sso.psychosocial.forms.findById);
router.post('/sos/psychosocial/forms/sections/entityById', tthhCtrl.sso.psychosocial.sections.findById);
router.post('/sos/psychosocial/evaluations/entityById', tthhCtrl.sso.psychosocial.evaluations.findById);
router.post('/sos/psychosocial/evaluation/questions/list', tthhCtrl.sso.psychosocial.evaluations.questionsByEvaluation);
router.post('/sos/psychosocial/evaluation/questions/selected', tthhCtrl.sso.psychosocial.evaluations.selectedQuestionsByEvaluation);
router.post('/sos/psychosocial/evaluation/questions', tthhCtrl.sso.psychosocial.evaluations.setQuestionsForEvaluation);
router.post('/sos/psychosocial/questionnaire/questions', tthhCtrl.sso.psychosocial.evaluations.questionnaireByEvaluation);
router.post('/sos/psychosocial/test', tthhCtrl.sso.psychosocial.test.insertPsychosocialTest);
// RESCATE VERTICAL
router.get('/sos/vrescue/categories/equipments/list/active', tthhCtrl.sso.vrescue.categoriesequipment.findAll);
router.post('/sos/vrescue/equipments/formByEquipment', tthhCtrl.sso.vrescue.equipments.formByEquipment);
router.post('/sos/vrescue/equipments/detailById', tthhCtrl.sso.vrescue.equipments.detailById);
router.post('/sos/vrescue/equipments/usage/formByHistoryId', tthhCtrl.sso.vrescue.history.formByHistoryId);
router.post('/sos/vrescue/equipments/usage/byEquipmentId/list', tthhCtrl.sso.vrescue.history.historyByEquipmentId);
// INSPECCION DE EXTINTORES
router.post('/sos/fextinguisher/list/stationId', tthhCtrl.sso.fextinguisher.list.listByStation);
router.post('/sos/fextinguisher/inspections/detail/entityId', tthhCtrl.sso.fextinguisher.inspections.detailById);



/*
* CONTROLLERS DE SCHEMAS
*/
// TALENTO HUMANO
router.get('/responsiblesByLeaderships', tthhCtrl.schema.findAResponsiblesByLeaderships);
router.get('/staffList', tthhCtrl.schema.findAllStaff);
router.get('/staff/functions/list', tthhCtrl.schema.findAllStaffFunctions);
router.get('/staff/ppersonal/functions/list', tthhCtrl.schema.findAllPpersonalFunctions);
router.get('/staff/ppersonal/functions/gservices/list', tthhCtrl.schema.staffToGServices);
router.post('/staff/leadership', tthhCtrl.schema.findAllStaffByLeadership);
router.get('/drivers', tthhCtrl.schema.findAllDrivers);
router.get('/platoons', tthhCtrl.schema.findAllPlatoons);
router.get('/filtersWaterfall', tthhCtrl.schema.findAllFiltersWaterfall);
router.get('/findCieByFilter', tthhCtrl.schema.findCieByFilter);
router.post('/regulations/actionType/list', tthhCtrl.schema.findRegulationsByActionTypeList);
router.post('/regulationsByActionType', tthhCtrl.schema.findRegulationsByActionType);
router.post('/regulationsByAction', tthhCtrl.schema.findRegulationsByAction);
// SEGURIDAD Y SALUD OCUPACIONAL
router.post('/sos/questionsdamageforms/list', tthhCtrl.schema.findQuestionsDamagesForms);
router.post('/sos/questionsdamageforms/list', tthhCtrl.schema.findQuestionDamageFormsByForm);

// EXPORTAR MODULO
module.exports = router;