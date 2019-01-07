module.exports = function(app) {
    const profiles = require('../controller/controller.profiles.js');
    const users = require('../controller/controller.users.js');
    const tthh = require('../controller/controller.tthh.js');
    const permits = require('../controller/controller.permits.js');
    const subjefature = require('../controller/controller.subjefature.js');
    const resources = require('../controller/controller.resources.js');
    const stations = require('../controller/controller.stations.js');

    /*
     * ADMINISTRACIÓN
     */
    // Listado de estaciones
    app.get('/api/stations', stations.findAll);
    app.get('/api/stations/:id', stations.findById);
    // Perfiles de usuario
    app.get('/api/profiles', profiles.findAll);
    app.get('/api/profiles/:id', profiles.findById);
    // Listado de usuarios
    app.get('/api/users', users.findAll);
    app.get('/api/users/:usuario', users.findById);

    /*
     * PERMISOS
     */
    app.get('/api/permits/commercialActivities', permits.findCommercialActivities);
    app.post('/api/permits/ciiu', permits.findCiiuByActivity);

    /*
     * SUBJEFATURA
     */
    app.post('/api/subjefature/codesByNature', subjefature.findCodesByNature);
    
    /*
     * TALENTO HUMANO
     */
    app.get('/api/tthh/staff', tthh.findAllStaff);
    app.get('/api/tthh/drivers', tthh.findAllDrivers);
    app.get('/api/tthh/platoons', tthh.findAllPlatoons);
    app.get('/api/tthh/filtersWaterfall', tthh.findAllFiltersWaterfall);
    
    /*
     * RESOURCES
     */
    app.get('/api/resources/countries', resources.findAllCountries);
    app.get('/api/resources/states/:countryId', resources.findStates);
    app.get('/api/resources/towns/:stateId', resources.findTowns);
    app.get('/api/resources/parishes/:townId', resources.findParishes);
    app.get('/api/resources/institutionalcodes', resources.findAllCodes);
    app.get('/api/resources/institutionalcodes/:option', resources.findCodesByType);

}