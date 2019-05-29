'use strict';
module.exports = function(app) {

    // DEFINICION DE CONTROLLERS
    /*
     * CONTROLLERS DE MODELOS
     */
    const resourcesCtrl = {
        persons:        require('../controller/resources/controller.persons'),
        coordinates:    require('../controller/resources/controller.coordinates'),
        geojson:        require('../controller/resources/controller.geojson'),
        resources:      require('../controller/resources/controller.resources')
    };
    const adminCtrl = {
        profiles:       require('../controller/admin/controller.profiles'),
        users:          require('../controller/admin/controller.users')
    };
    const permitsCtrl = {
        activities:     require('../controller/permits/controller.activities'),
        entities:       require('../controller/permits/controller.entities'),
        locals:         require('../controller/permits/controller.locals'),
        employees:      require('../controller/permits/controller.employees')
    };
    const preventionCtrl = {
        plans:                      require('../controller/prevention/controller.plans'),
        selfProtectionAnnexes:      require('../controller/prevention/controller.selfProtection.annexes'),
        selfProtectionFactors:      require('../controller/prevention/controller.selfProtection.factors'),
        selfProtectionPrevention:   require('../controller/prevention/controller.selfProtection.prevention'),
        selfProtectionMaintenance:  require('../controller/prevention/controller.selfProtection.maintenance'),
        selfProtectionMeseri:       require('../controller/prevention/controller.selfProtection.meseri'),
        brigades:                   require('../controller/prevention/controller.brigades'),
        brigadists:                 require('../controller/prevention/controller.brigadists')
    };
    const subjefatureCtrl = {
        
    };
    const tthhCtrl = {
        leaderships:    require('../controller/tthh/controller.leaderships'),
        jobs:           require('../controller/tthh/controller.jobs'),
        arrears:        require('../controller/tthh/controller.arrears'),
        stations:       require('../controller/tthh/controller.stations'),
        academic:       require('../controller/tthh/controller.academicTraining')
    };
    /*
     * CONTROLLERS DE SCHEMAS
     */
    const schemasCtrl = {
        resources:      require('../controller/controller.resources.js'),
        admin:          require('../controller/controller.admin.js'),
        tthh:           require('../controller/controller.tthh.js'),
        permits:        require('../controller/controller.permits.js'),
        administrative: require('../controller/controller.administrative.js'),
        subjefature:    require('../controller/controller.subjefature.js'),
        prevention:     require('../controller/controller.prevencion.js')
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
    app.post('/api/prevention/plans/selfProtectionMeseriByPlan', preventionCtrl.selfProtectionMeseri.findSelfProtectionMeseriByPlan);
    app.post('/api/prevention/brigades', preventionCtrl.brigades.insertEntity);
    app.put('/api/prevention/brigades', preventionCtrl.brigades.insertEntity);
    app.post('/api/prevention/brigades/localId', preventionCtrl.brigades.findByLocal);
    app.post('/api/prevention/brigadists', preventionCtrl.brigadists.insertBrigadists);
    app.post('/api/prevention/brigadists/brigadeId', preventionCtrl.brigadists.findByBrigade);
    // PERMISOS
    app.get('/api/permits/commercialActivities', permitsCtrl.activities.findCommercialActivities);
    app.get('/api/permits/entities/:entityRuc', permitsCtrl.entities.findByEntity);
    app.get('/api/permits/entities/resumen/:entityRuc', permitsCtrl.entities.summaryByRuc);
    app.post('/api/permits/entities/login', permitsCtrl.entities.findByRUC);
    app.post('/api/permits/entities/enitiyByRUC', permitsCtrl.entities.findByRUC);
    app.post('/api/permits/locals/localId', permitsCtrl.locals.findById);
    app.put('/api/permits/locals', permitsCtrl.locals.updateEntity);
    app.post('/api/permits/employees/localId', permitsCtrl.employees.findByLocal);
    // TTHH
    app.post('/api/atrasos', tthhCtrl.arrears.insertEntity);
    app.get('/api/tthh/leaderships', tthhCtrl.leaderships.findAll);
    app.get('/api/tthh/jobs', tthhCtrl.jobs.findAll);
    app.get('/api/tthh/stations', tthhCtrl.stations.findAll);
    app.get('/api/tthh/stations/:id', tthhCtrl.stations.findById);

    /*
     * CONTROLLERS DE SCHEMAS
     */
    // PERMISOS
    app.post('/api/permits/ciiu', schemasCtrl.permits.findCiiuByActivity);
    app.post('/api/permits/permitsByLocal', schemasCtrl.permits.findPermitsByLocal);
    // PREVENCION
    app.post('/api/prevention/inspectionsByEntity', schemasCtrl.prevention.inspectionsByEntity);
    app.post('/api/prevention/inspectionsByLocal', schemasCtrl.prevention.inspectionsByLocal);
    // ADMINISTRATIVO
    app.get('/api/administrative/units', schemasCtrl.administrative.findAllUnits);
    // SUBJEFATURA
    app.post('/api/subjefature/codesByNature', schemasCtrl.subjefature.findCodesByNature);
    // TALENTO HUMANO
    app.get('/api/tthh/responsiblesByLeaderships', schemasCtrl.tthh.findAResponsiblesByLeaderships);
    app.get('/api/tthh/staff', schemasCtrl.tthh.findAllStaff);
    app.get('/api/tthh/drivers', schemasCtrl.tthh.findAllDrivers);
    app.get('/api/tthh/platoons', schemasCtrl.tthh.findAllPlatoons);
    app.get('/api/tthh/filtersWaterfall', schemasCtrl.tthh.findAllFiltersWaterfall);
    app.get('/api/tthh/findMedicinesInStock', schemasCtrl.tthh.findMedicinesInStock);
    app.get('/api/tthh/findCieByFilter', schemasCtrl.tthh.findCieByFilter);
    // RESOURCES
    app.get('/api/resources/slides/:module', schemasCtrl.resources.findSlidesByModule);
    app.get('/api/resources/countries', schemasCtrl.resources.findAllCountries);
    app.get('/api/resources/states/:countryId', schemasCtrl.resources.findStates);
    app.get('/api/resources/towns/:stateId', schemasCtrl.resources.findTowns);
    app.get('/api/resources/parishes/:townId', schemasCtrl.resources.findParishes);
    app.get('/api/resources/institutionalcodes', schemasCtrl.resources.findAllCodes);
    app.get('/api/resources/institutionalcodes/:option', schemasCtrl.resources.findCodesByType);

    /*
     * TWILIO
     */
    app.post('/twilio', schemasCtrl.admin.requestTwilio);

}