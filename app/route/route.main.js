'use strict';
module.exports = function(app) {

    // DEFINICION DE CONTROLLERS
    /*
     * CONTROLLERS DE MODELOS
     */
    const resourcesCtrl = {
        persons:        require('../controller/resources/controller.persons.js'),
        coordinates:    require('../controller/resources/controller.coordinates.js'),
        geojson:        require('../controller/resources/controller.geojson.js')
    };
    const adminCtrl = {
        profiles:       require('../controller/admin/controller.profiles.js'),
        users:          require('../controller/admin/controller.users.js')
    };
    const permitsCtrl = {
        activities:     require('../controller/permits/controller.activities'),
        entities:       require('../controller/permits/controller.entities.js'),
        locals:         require('../controller/permits/controller.locals.js')
    };
    const preventionCtrl = {
        plans:          require('../controller/prevention/controller.plans')
    };
    const subjefatureCtrl = {
        
    };
    const tthhCtrl = {
        leaderships:    require('../controller/tthh/controller.leaderships.js'),
        jobs:           require('../controller/tthh/controller.jobs.js'),
        stations:       require('../controller/tthh/controller.stations.js'),
        academic:       require('../controller/tthh/controller.academicTraining.js')
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
    app.post('/api/resources/persons', resourcesCtrl.persons.findByCC);
    app.post('/api/resources/persons/academicTraining', tthhCtrl.academic.findByPerson);
    app.post('/api/resources/geojson/entityId', resourcesCtrl.geojson.findByEntity);
    app.post('/api/resources/coordinates/entityId', resourcesCtrl.coordinates.findByEntity);
    // ADMIN
    app.get('/api/admin/profiles', adminCtrl.profiles.findAll);
    app.get('/api/admin/profiles/:id', adminCtrl.profiles.findById);
    app.get('/api/admin/users', adminCtrl.users.findAll);
    // PREVENCION
    app.post('/api/prevention/plans/localId', preventionCtrl.plans.findByLocalId);
    app.post('/api/prevention/plans/planById', preventionCtrl.plans.findById);

    // PERMISOS
    app.get('/api/permits/commercialActivities', permitsCtrl.activities.findCommercialActivities);
    app.get('/api/permits/entities/:entityRuc', permitsCtrl.entities.findByEntity);
    app.get('/api/permits/entities/resumen/:entityRuc', permitsCtrl.entities.summaryByRuc);
    app.post('/api/permits/entities/login', permitsCtrl.entities.findByRUC);
    app.post('/api/permits/entities', permitsCtrl.entities.findByRUC);
    app.post('/api/permits/local/localId', permitsCtrl.locals.findById);
    app.put('/api/permits/locals', permitsCtrl.locals.updateEntity);
    // TTHH
    app.get('/api/tthh/leaderships', tthhCtrl.leaderships.findAll);
    app.get('/api/tthh/jobs', tthhCtrl.jobs.findAll);
    app.get('/api/tthh/stations', tthhCtrl.stations.findAll);
    app.get('/api/tthh/stations/:id', tthhCtrl.stations.findById);

    /*
     * CONTROLLERS DE SCHEMAS
     */
    // PERMISOS
    app.post('/api/permits/ciiu', schemasCtrl.permits.findCiiuByActivity);
    // PREVENCION
    app.post('/api/prevention/inspectionsByEntity', schemasCtrl.prevention.inspectionsByEntity);
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