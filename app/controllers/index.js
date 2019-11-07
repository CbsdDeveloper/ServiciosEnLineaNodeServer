'use strict';

const adminCtrl = require('./controller.admin');
const administrativeCtrl = require('./controller.administrative');
const financialCtrl = require('./controller.financial');
const permitsCtrl = require('./controller.permits');
const prevencionCtrl = require('./controller.prevencion');
const resourcesCtrl = require('./controller.resources');
const subjefatureCtrl = require('./controller.subjefature');
const tthhCtrl = require('./controller.tthh');
const twilioCtrl = require('./controller.twilio');

const employee = require('./permits/controller.employees');

module.exports = {
    adminCtrl,
    administrativeCtrl,
    financialCtrl,
    permitsCtrl,
    prevencionCtrl,
    resourcesCtrl,
    subjefatureCtrl,
    tthhCtrl,
    twilioCtrl,

    employee
};