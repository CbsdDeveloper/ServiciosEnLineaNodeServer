module.exports = function(app) {
    const profiles = require('../controller/controller.profiles.js');
    const users = require('../controller/controller.users.js');
    const tthh = require('../controller/controller.tthh.js');
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
     * SUBJEFATURA
     */
    app.post('/api/subjefature/codesByNature', subjefature.findCodesByNature);
    
    /*
     * TALENTO HUMANO
     */
    app.get('/api/tthh/staff', tthh.findAllStaff);
    app.get('/api/tthh/drivers', tthh.findAllDrivers);
    
    /*
     * RESOURCES
     */
    app.get('/api/resources/institutionalcodes', resources.findAllCodes);
    app.get('/api/resources/institutionalcodes/:option', resources.findCodesByType);
}