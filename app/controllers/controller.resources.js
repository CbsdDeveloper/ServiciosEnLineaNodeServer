'use strict';
const db = require('../models');
const sql = db.sequelize;

// Listado de slides de módulos
exports.findSlidesByModule = (req, res) => {
    sql.query("SELECT * FROM servicios.tb_slides WHERE slide_estado='ACTIVO' AND UPPER(slide_modulo) IN (UPPER(:module),'MAIN') ORDER BY slide_id", { replacements: req.params, type: sql.QueryTypes.SELECT }).then(function (data) {
        db.setJSON(res,data,'LISTADO DE SLIDES');
    }).catch(function (err) {return next(err);});
};

// Listado de paises
exports.findAllCountries = (req, res) => {
    sql.query("SELECT * FROM resources.countries", { type: sql.QueryTypes.SELECT }).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PAISES');
    }).catch(function (err) {return next(err);});
};

// Listado de paises
exports.findAllCountries = (req, res) => {
    sql.query("SELECT * FROM resources.countries", { type: sql.QueryTypes.SELECT }).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PAISES');
    }).catch(function (err) {return next(err);});
};

// Listado de provincias
exports.findStates = (req, res) => {
    sql.query("SELECT * FROM resources.states WHERE fk_country_id = :countryId", { replacements: req.params, type: sql.QueryTypes.SELECT }).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PROVINCIAS');
    }).catch(function (err) {return next(err);});
};

// Listado de cantones
exports.findTowns = (req, res) => {
    sql.query("SELECT * FROM resources.towns WHERE fk_state_id = :stateId", { replacements: req.params, type: sql.QueryTypes.SELECT }).then(function (data) {
        db.setJSON(res,data,'LISTADO DE CANTONES');
    }).catch(function (err) {return next(err);});
};

// Listado de parroquias
exports.findParishes = (req, res) => {
    sql.query("SELECT * FROM resources.parishes WHERE fk_town_id = :townId", { replacements: req.params, type: sql.QueryTypes.SELECT }).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PARROQUIAS');
    }).catch(function (err) {return next(err);});
};

// Códigos institucionales
exports.findAllCodes = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM resources.vw_codigosinstitucionales", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE CÓDIGOS INSTITUCIONALES');
    }).catch(function (err) {return next(err);});
};

// Códigos institucionales por evento
exports.findCodesByType = (req, res) => {
    const type = { tracking:'codigo_flota', part:'codigo_parte' };
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM resources.vw_codigosinstitucionales WHERE " + type[req.params.option] + "='SI' ORDER BY codigo_clave", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE CÓDIGOS INSTITUCIONALES');
    }).catch(function (err) {return next(err);});
};

// LISTADO DE PREGUNTAS PARA FORMULARIOS DE EVALUACION DE RIESGO PSICOSOCIAL
exports.psychosocialFormQuestionsList = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_preguntaspsicosocial ORDER BY recurso_nombre", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PREGUNTAS PARA FORMULARIOS DE EVALUACIÓN DE RIESGO PSICOSOCIAL');
    }).catch(function (err) {return next(err);});
};

// SISTEMA DE CALIFICACION PARA FORMULARIOS DE EVALUACION DE RIESGO PSICOSOCIAL
exports.psychosocialRatingSystemList = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_sistemacalificacionpsicosocial ORDER BY recurso_nombre", replacements).then(function (data) {
        db.setJSON(res,data,'SISTEMA DE CALIFICACION PARA FORMULARIOS DE EVALUACION DE RIESGO PSICOSOCIAL');
    }).catch(function (err) {return next(err);});
};