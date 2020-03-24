'use strict';
module.exports = function(app) {

    // DEFINICION DE CONTROLLERS
    /*
     * CONTROLLERS DE MODELOS
     */
    const resourcesCtrl = {
        persons:        require('../controllers/resources/controller.persons'),
        coordinates:    require('../controllers/resources/controller.coordinates'),
        geojson:        require('../controllers/resources/controller.geojson'),
        resources:      require('../controllers/resources/controller.resources')
    };
    const adminCtrl = {
        labels:         require('../controllers/admin/controller.labels'),
        reports:        require('../controllers/admin/controller.reports'),
        parameters:     require('../controllers/admin/controller.parameters'),
        webmail:        require('../controllers/admin/controller.webmail'),
        profiles:       require('../controllers/admin/controller.profiles'),
        users:          require('../controllers/admin/controller.users')
    };
    const permitsCtrl = {
        activities:     require('../controllers/permits/controller.activities'),
        entities:       require('../controllers/permits/controller.entities'),
        locals:         require('../controllers/permits/controller.locals'),
        employees:      require('../controllers/permits/controller.employees')
    };
    const preventionCtrl = {
        plans:                      require('../controllers/prevention/controller.plans'),
        selfProtectionAnnexes:      require('../controllers/prevention/controller.selfProtection.annexes'),
        selfProtectionFactors:      require('../controllers/prevention/controller.selfProtection.factors'),
        selfProtectionPrevention:   require('../controllers/prevention/controller.selfProtection.prevention'),
        selfProtectionMaintenance:  require('../controllers/prevention/controller.selfProtection.maintenance'),
        selfProtectionMeseri:       require('../controllers/prevention/controller.selfProtection.meseri'),
        brigades:                   require('../controllers/prevention/controller.brigades'),
        brigadists:                 require('../controllers/prevention/controller.brigadists')
    };
    const subjefatureCtrl = {
        
    };
    const tthhCtrl = {
        workdays:           require('../controllers/tthh/controller.workdays'),
        leaderships:        require('../controllers/tthh/controller.leaderships'),
        jobs:               require('../controllers/tthh/controller.jobs'),
        staff:              require('../controllers/tthh/controller.staff'),
        arrears:            require('../controllers/tthh/controller.arrears'),
        biometric:          require('../controllers/tthh/controller.biometric'),
        biometricPeriods:   require('../controllers/tthh/controller.biometricPeriods'),
        biometricMarkings:  require('../controllers/tthh/controller.biometricMarkings'),
        ranches:            require('../controllers/tthh/controller.ranches'),
        typeadvances:       require('../controllers/tthh/controller.typeadvances'),
        typecontracts:      require('../controllers/tthh/controller.typecontracts'),
        stations:           require('../controllers/tthh/controller.stations'),
        academic:           require('../controllers/tthh/controller.academicTraining'),
        medicines:          require('../controllers/tthh/controller.medicines'),
        psychosocialforms:          require('../controllers/tthh/controller.psychosocial.forms'),
        psychosocialsections:       require('../controllers/tthh/controller.psychosocial.sections'),
        psychosocialevaluations:    require('../controllers/tthh/controller.psychosocial.evaluations'),
        psychosocialtest:           require('../controllers/tthh/controller.psychosocial.test'),
        aphSupplies:            require('../controllers/tthh/controller.aph.supplies'),
        aphSupplycontrol:       require('../controllers/tthh/controller.aph.supplycontrol'),
        aphSupplyMovements:     require('../controllers/tthh/controller.aph.supplycontrolmovements'),
        wineries:               require('../controllers/tthh/controller.wineries')
    };
    const financialCtrl = {
        contractingprocedures:      require('../controllers/financial/controller.contractingprocedures'),
        budgetclassifier:           require('../controllers/financial/controller.budgetclassifier'),
        retentionclassifier:        require('../controllers/financial/controller.retentionclassifier'),
        accountcatalog:             require('../controllers/financial/controller.accountcatalog'),
        programs:                   require('../controllers/financial/controller.programs'),
        subprograms:                require('../controllers/financial/controller.subprograms'),
        projects:                   require('../controllers/financial/controller.projects'),
        activities:                 require('../controllers/financial/controller.activities'),
        entities:                   require('../controllers/financial/controller.entities'),
        typedocuments:              require('../controllers/financial/controller.typedocuments')
    };
    const planingCtrl = {
        programspoa:        require('../controllers/planing/controller.programspoa'),
        poa:                require('../controllers/planing/controller.programspoa'),
        poaprojects:        require('../controllers/planing/controller.poaprojects')
    };
    /*
     * CONTROLLERS DE SCHEMAS
     */
    const schemasCtrl = {
        resources:      require('../controllers/controller.resources.js'),
        admin:          require('../controllers/controller.admin.js'),
        tthh:           require('../controllers/controller.tthh.js'),
        financial:      require('../controllers/controller.financial'),
        permits:        require('../controllers/controller.permits.js'),
        administrative: require('../controllers/controller.administrative.js'),
        subjefature:    require('../controllers/controller.subjefature.js'),
        prevention:     require('../controllers/controller.prevencion.js')
    };

// DEFINICION DE RUTAS
    /*
     * CONTROLLERS DE MODELOS
     */
    // RESOURCES
    app.post('/api/resources/persons/personByCC', resourcesCtrl.persons.findByCC);
    app.post('/api/resources/persons/id', resourcesCtrl.persons.findById);
    app.post('/api/resources/persons/academicTraining', tthhCtrl.academic.findByPerson);
    app.post('/api/resources/academicTraining/identificationPerson', tthhCtrl.academic.findByIdentificationPerson);
    app.post('/api/resources/geojson/entityId', resourcesCtrl.geojson.findByEntity);
    app.post('/api/resources/coordinates/entityId', resourcesCtrl.coordinates.findByEntity);
    app.get('/api/resources/resources/plans/factors', resourcesCtrl.resources.findResourcesFactorsForPlans);
    app.get('/api/resources/resources/plans/prevention', resourcesCtrl.resources.findResourcesPreventionForPlans);
    // ADMIN
    app.get('/api/admin/profiles', adminCtrl.profiles.findAll);
    app.get('/api/admin/profiles/:id', adminCtrl.profiles.findById);
    app.get('/api/admin/users', adminCtrl.users.findAll);
    // PREVENCION
    app.post('/api/prevention/plans/localId', preventionCtrl.plans.findByLocalId);
    app.post('/api/prevention/plans/planById', preventionCtrl.plans.findById);
    app.put('/api/prevention/plans/selfproteccion', preventionCtrl.plans.updateEntity);
    app.put('/api/prevention/plans/selfproteccion/relations', preventionCtrl.plans.updateResourcesEntity);
    app.post('/api/prevention/plans/selfProtectionAnnexesByPlan', preventionCtrl.selfProtectionAnnexes.findSelfProtectionAnnexesByPlan);
    app.post('/api/prevention/plans/selfProtectionFactorsByPlan', preventionCtrl.selfProtectionFactors.findSelfProtectionFactorsByPlan);
    app.post('/api/prevention/plans/selfProtectionPreventionByPlan', preventionCtrl.selfProtectionPrevention.findSelfProtectionPreventionByPlan);
    app.post('/api/prevention/plans/selfProtectionMaintenanceByPlan', preventionCtrl.selfProtectionMaintenance.findSelfProtectionMaintenanceByPlan);
    app.post('/api/prevention/plans/findSelfProtectionMaintenanceApplyByPlan', preventionCtrl.selfProtectionMaintenance.findSelfProtectionMaintenanceApplyByPlan);
    app.post('/api/prevention/plans/selfProtectionMeseriByPlan', preventionCtrl.selfProtectionMeseri.findSelfProtectionMeseriByPlan);
    app.post('/api/prevention/brigades', preventionCtrl.brigades.insertEntity);
    app.put('/api/prevention/brigades', preventionCtrl.brigades.insertEntity);
    app.delete('/api/prevention/brigades/:brigadeId', preventionCtrl.brigades.deleteEntity);
    app.post('/api/prevention/brigades/localId', preventionCtrl.brigades.findByLocal);
    app.post('/api/prevention/brigadists', preventionCtrl.brigadists.insertBrigadists);
    app.post('/api/prevention/brigadists/brigadeId', preventionCtrl.brigadists.findByBrigade);
    // PERMISOS
    app.get('/api/permits/commercialActivities', permitsCtrl.activities.findCommercialActivities);
    app.get('/api/permits/entities/:entityRuc', permitsCtrl.entities.findByEntity);
    app.post('/api/permits/entities/entityId', permitsCtrl.entities.findById);
    app.get('/api/permits/entities/resumen/:entityRuc', permitsCtrl.entities.summaryByRuc);
    app.post('/api/permits/entities/login', permitsCtrl.entities.findByRUC);
    app.post('/api/permits/entities/enitiyByRUC', permitsCtrl.entities.findByRUC);
    app.post('/api/permits/locals/localId', permitsCtrl.locals.findById);
    app.put('/api/permits/locals', permitsCtrl.locals.updateEntity);
    
    app.post('/api/permits/employees/localId', permitsCtrl.employees.findByLocal);
    app.put('/api/permits/employees', permitsCtrl.employees.updateEntity);
    app.delete('/api/permits/employees/:employeeId', permitsCtrl.employees.deleteEntity);
    app.delete('/api/permits/employees/localId/all/:localId', permitsCtrl.employees.deleteByLocal);
    // TTHH
    app.post('/api/atrasos', tthhCtrl.arrears.insertEntity);
    app.get('/api/tthh/typeadvances/list', tthhCtrl.typeadvances.listEntity);
    app.put('/api/tthh/typeadvances', tthhCtrl.typeadvances.updateEntity);
    app.put('/api/tthh/typecontracts', tthhCtrl.typecontracts.updateEntity);
    app.get('/api/tthh/workdays', tthhCtrl.workdays.findAll);
    app.post('/api/tthh/workdays/detail', tthhCtrl.workdays.findByIdDetail);
    app.put('/api/tthh/workdays', tthhCtrl.workdays.updateEntity);
    app.put('/api/tthh/staff/biometric', tthhCtrl.staff.updateBiometricCode);
    app.post('/api/tthh/biometricperiods', tthhCtrl.biometricPeriods.insertEntity);
    app.put('/api/tthh/biometricperiods', tthhCtrl.biometricPeriods.updateEntity);
    app.put('/api/tthh/staff/biometric/markings', tthhCtrl.biometricMarkings.updateEntity);
    app.get('/api/tthh/leaderships', tthhCtrl.leaderships.findAll);
    app.get('/api/tthh/jobs', tthhCtrl.jobs.findAll);
    app.get('/api/tthh/jobs/leaderships', tthhCtrl.jobs.findAllStaffByLeadership);
    app.get('/api/tthh/stations', tthhCtrl.stations.findAll);
    app.get('/api/tthh/wineries', tthhCtrl.wineries.findAll);
    app.get('/api/tthh/stations/:id', tthhCtrl.stations.findById);
        // DEP. MEDICO
    app.get('/api/tthh/pharmacy/supplies', tthhCtrl.medicines.findAll);
    app.get('/api/tthh/pharmacy/supplies/inventory', tthhCtrl.medicines.findInventory);
    app.post('/api/tthh/pharmacy/supplies/inventory', tthhCtrl.medicines.insertInventory);
    app.get('/api/tthh/pharmacy/supplies/stock', tthhCtrl.medicines.findStock);
        // APH
    app.post('/api/tthh/aph/suppliesinventory/movements/list', tthhCtrl.aphSupplyMovements.suppliesByInventoryId);
    app.post('/api/tthh/aph/supplies/inventory/single', tthhCtrl.aphSupplyMovements.insertInventory);
        // RIESGO PSICOSOCIAL
    app.get('/api/tthh/sos/psychosocial/forms/list', tthhCtrl.psychosocialforms.findAll);
    app.get('/api/tthh/sos/psychosocial/forms/list/active', tthhCtrl.psychosocialforms.findAllActive);
    app.post('/api/tthh/sos/psychosocial/forms/entityById', tthhCtrl.psychosocialforms.findById);
    app.post('/api/tthh/sos/psychosocial/forms/sections/entityById', tthhCtrl.psychosocialsections.findById);
    app.post('/api/tthh/sos/psychosocial/evaluations/entityById', tthhCtrl.psychosocialevaluations.findById);
    app.post('/api/tthh/sos/psychosocial/evaluation/questions/list', tthhCtrl.psychosocialevaluations.questionsByEvaluation);
    app.post('/api/tthh/sos/psychosocial/evaluation/questions/selected', tthhCtrl.psychosocialevaluations.selectedQuestionsByEvaluation);
    app.post('/api/tthh/sos/psychosocial/evaluation/questions', tthhCtrl.psychosocialevaluations.setQuestionsForEvaluation);
    app.post('/api/tthh/sos/psychosocial/questionnaire/questions', tthhCtrl.psychosocialevaluations.questionnaireByEvaluation);
    app.post('/api/tthh/sos/psychosocial/test', tthhCtrl.psychosocialtest.insertPsychosocialTest);
    // PLANIFICACION - POA
    app.get('/api/planing/poa/programs/list', planingCtrl.programspoa.findAll);
    app.post('/api/planing/poa/projects/list/poaId', planingCtrl.poaprojects.findByPoa);
    // FINANCIERO - RECAUDACION
    app.get('/api/financial/priorcontrol/contractingprocedures', financialCtrl.contractingprocedures.findAll);
    app.get('/api/financial/priorcontrol/processcontracts/processId', financialCtrl.contractingprocedures.findById);


    /*
     * SERVICIOS PARA PAGINAR RESULTADOS
     */
    // ADMIN
    app.get('/api/paginate/admin/labels', adminCtrl.labels.paginationEntity);
    app.get('/api/paginate/admin/parameters', adminCtrl.parameters.paginationEntity);
    app.get('/api/paginate/admin/webmail', adminCtrl.webmail.paginationEntity);
    app.get('/api/paginate/admin/reports', adminCtrl.reports.paginationEntity);
    // PERMISOS
    app.get('/api/paginate/permits/entities', permitsCtrl.entities.paginationEntity);
    // TALENTO HUMANO
    app.get('/api/paginate/tthh/workdays', tthhCtrl.workdays.paginationEntity);
    app.get('/api/paginate/tthh/typeadvances', tthhCtrl.typeadvances.paginationEntity);
    app.get('/api/paginate/tthh/typecontracts', tthhCtrl.typecontracts.paginationEntity);
    app.get('/api/paginate/tthh/biometriccodes', tthhCtrl.biometric.paginationEntity);
    app.get('/api/paginate/tthh/biometricperiods', tthhCtrl.biometricPeriods.paginationEntity);
    app.get('/api/paginate/tthh/biometricmarkings', tthhCtrl.biometricMarkings.paginationEntity);
    app.get('/api/paginate/tthh/ranches', tthhCtrl.ranches.paginationEntity);
    app.get('/api/paginate/tthh/aph/supplies/list', tthhCtrl.aphSupplies.paginationEntity);
    app.get('/api/paginate/tthh/aph/supplies/all/stock/list', tthhCtrl.aphSupplies.paginationStockSupplies);
    app.get('/api/paginate/tthh/aph/supplies/stock/wineries/list', tthhCtrl.aphSupplies.paginationSuppliesStockStations);
    app.get('/api/paginate/tthh/aph/control/supplies', tthhCtrl.aphSupplycontrol.paginationEntity);
    app.get('/api/paginate/tthh/institution/wineries/list', tthhCtrl.wineries.paginationEntity);
    // FINANCIERO
    app.get('/api/paginate/financial/budgetclassifier', financialCtrl.budgetclassifier.paginationEntity);
    app.get('/api/paginate/financial/retentionclassifier', financialCtrl.retentionclassifier.paginationEntity);
    app.get('/api/paginate/financial/accountcatalog', financialCtrl.accountcatalog.paginationEntity);
    app.get('/api/paginate/financial/programs', financialCtrl.programs.paginationEntity);
    app.get('/api/paginate/financial/subprograms', financialCtrl.subprograms.paginationEntity);
    app.get('/api/paginate/financial/projects', financialCtrl.projects.paginationEntity);
    app.get('/api/paginate/financial/activities', financialCtrl.activities.paginationEntity);
    app.get('/api/paginate/financial/entities', financialCtrl.entities.paginationEntity);
    app.get('/api/paginate/financial/typedocuments', financialCtrl.typedocuments.paginationEntity);


    /*
     * CONTROLLERS DE SCHEMAS
     */
    // ADMIN
    app.get('/api/admin/users/prevention', schemasCtrl.admin.findInspectorsPrevention);
    // PERMISOS
    app.post('/api/permits/ciiu', schemasCtrl.permits.findCiiuByActivity);
    app.post('/api/permits/permitsByLocal', schemasCtrl.permits.findPermitsByLocal);
    app.post('/api/permits/permits/localId', schemasCtrl.permits.findPermitsByLocal);
    // PREVENCION
    app.post('/api/prevention/training/participants/entityId', schemasCtrl.prevention.findParticipantsByEntityId);
    app.post('/api/prevention/training/participants/trainingId', schemasCtrl.prevention.findParticipantsByTrainingId);
    app.post('/api/prevention/inspectionsByEntity', schemasCtrl.prevention.inspectionsByEntity);
    app.post('/api/prevention/inspectionsByLocal', schemasCtrl.prevention.inspectionsByLocal);
    app.post('/api/prevention/training/history/entityId', schemasCtrl.prevention.findTrainingsByEntity);
    // ADMINISTRATIVO
    app.get('/api/administrative/units', schemasCtrl.administrative.findAllUnits);
    // SUBJEFATURA
    app.post('/api/subjefature/codesByNature', schemasCtrl.subjefature.findCodesByNature);
    // TALENTO HUMANO
    app.get('/api/tthh/responsiblesByLeaderships', schemasCtrl.tthh.findAResponsiblesByLeaderships);
    app.get('/api/tthh/staffList', schemasCtrl.tthh.findAllStaff);
    app.get('/api/tthh/staff/functions/list', schemasCtrl.tthh.findAllStaffFunctions);
    app.post('/api/tthh/staff/leadership', schemasCtrl.tthh.findAllStaffByLeadership);
    app.get('/api/tthh/drivers', schemasCtrl.tthh.findAllDrivers);
    app.get('/api/tthh/platoons', schemasCtrl.tthh.findAllPlatoons);
    app.get('/api/tthh/filtersWaterfall', schemasCtrl.tthh.findAllFiltersWaterfall);
    app.get('/api/tthh/findCieByFilter', schemasCtrl.tthh.findCieByFilter);
    app.post('/api/tthh/regulations/actionType/list', schemasCtrl.tthh.findRegulationsByActionTypeList);
    app.post('/api/tthh/regulationsByActionType', schemasCtrl.tthh.findRegulationsByActionType);
    app.post('/api/tthh/regulationsByAction', schemasCtrl.tthh.findRegulationsByAction);
    app.post('/api/tthh/sos/questionsdamageforms/list', schemasCtrl.tthh.findQuestionsDamagesForms);
    app.post('/api/tthh/sos/questionsdamageforms/list', schemasCtrl.tthh.findQuestionDamageFormsByForm);
    // FINANCIERO - RECAUDACION
    app.get('/api/financial/priorcontrol/requirements/list', schemasCtrl.financial.findRequirementsForContractingProcedures);
    // RESOURCES
    app.get('/api/resources/slides/:module', schemasCtrl.resources.findSlidesByModule);
    app.get('/api/resources/countries', schemasCtrl.resources.findAllCountries);
    app.get('/api/resources/states/:countryId', schemasCtrl.resources.findStates);
    app.get('/api/resources/towns/:stateId', schemasCtrl.resources.findTowns);
    app.get('/api/resources/parishes/:townId', schemasCtrl.resources.findParishes);
    app.get('/api/resources/institutionalcodes', schemasCtrl.resources.findAllCodes);
    app.get('/api/resources/institutionalcodes/:option', schemasCtrl.resources.findCodesByType);
    app.get('/api/resources/sos/psychosocial/forms/questions/list', schemasCtrl.resources.psychosocialFormQuestionsList);
    app.get('/api/resources/sos/psychosocial/forms/ratingsystem/list', schemasCtrl.resources.psychosocialRatingSystemList);

    /*
     * TWILIO
     */
    app.post('/twilio', schemasCtrl.admin.requestTwilio);

}