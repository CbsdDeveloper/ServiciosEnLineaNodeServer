'use strict';
const express = require("express");
const router = express.Router();

/*
* CONTROLLERS DE MODELOS
*/
const resourcesCtrl = {
    persons: require('../controllers/resources/controller.persons'),
    coordinates: require('../controllers/resources/controller.coordinates'),
    geojson: require('../controllers/resources/controller.geojson'),
    resources: require('../controllers/resources/controller.resources'),
    forms: require('../controllers/resources/controller.forms'),
    formSections: require('../controllers/resources/controller.forms.sections'),
    formQuestions: require('../controllers/resources/controller.forms.questions'),

    academic: require('../controllers/tthh/controller.academicTraining'),

    surveysEvaluations: require('../controllers/tthh/surveys/controller.evaluations'),

    schema: require('../controllers/controller.resources.js')
};

/*
* SERVICIOS PARA PAGINAR RESULTADOS
*/
router.get('/resources/tthh/surveys/ratingsystem', resourcesCtrl.resources.paginationRatingSystems);
router.get('/resources/tthh/surveys/forms', resourcesCtrl.forms.paginationEntity);
router.get('/resources/tthh/surveys/forms/sections', resourcesCtrl.formSections.paginationEntity);
router.get('/resources/tthh/surveys/evaluations', resourcesCtrl.surveysEvaluations.paginationEntity);

/*
* CONTROLLERS DE MODELOS
*/
router.post('/persons/personByCC', resourcesCtrl.persons.findByCC);
router.post('/persons/id', resourcesCtrl.persons.findById);
router.post('/persons/academicTraining', resourcesCtrl.academic.findByPerson);
router.post('/academicTraining/identificationPerson', resourcesCtrl.academic.findByIdentificationPerson);
router.post('/geojson/entityId', resourcesCtrl.geojson.findByEntity);
router.post('/coordinates/entityId', resourcesCtrl.coordinates.findByEntity);
router.get('/resources/plans/factors', resourcesCtrl.resources.findResourcesFactorsForPlans);
router.get('/resources/plans/prevention', resourcesCtrl.resources.findResourcesPreventionForPlans);
router.post('/surveys/forms/entityById', resourcesCtrl.forms.findById);
router.get('/surveys/ratingsystem/list', resourcesCtrl.resources.getRatingsystem);

/*
* CONTROLLERS DE SCHEMAS
*/
router.get('/slides/:module', resourcesCtrl.schema.findSlidesByModule);
router.get('/countries', resourcesCtrl.schema.findAllCountries);
router.get('/states/:countryId', resourcesCtrl.schema.findStates);
router.get('/towns/:stateId', resourcesCtrl.schema.findTowns);
router.get('/parishes/:townId', resourcesCtrl.schema.findParishes);
router.get('/institutionalcodes', resourcesCtrl.schema.findAllCodes);
router.get('/institutionalcodes/:option', resourcesCtrl.schema.findCodesByType);
router.get('/sos/psychosocial/forms/questions/list', resourcesCtrl.schema.psychosocialFormQuestionsList);
router.get('/sos/psychosocial/forms/ratingsystem/list', resourcesCtrl.schema.psychosocialRatingSystemList);

// EXPORTAR MODULO
module.exports = router;