'use strict';
const db = require('../config/db.config.js');
const sql = db.sequelize;

// PERSONAL EN FUNCIONES
exports.findAllStaff = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_personal WHERE ppersonal_estado='EN FUNCIONES' ORDER BY personal_nombre", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PERSONAL EN FUNCIONES');
    }).catch(function (err) {return next(err);});
};

// OPERADORES
exports.findAllDrivers = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_conductores WHERE personal_estado='EN FUNCIONES' ORDER BY personal_nombre, licencia_categoria", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE CONDUCTORES');
    }).catch(function (err) {return next(err);});
};

// LISTADO DE PELOTONES
exports.findAllPlatoons = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    var platoonsList = {};
    sql.query("SELECT * FROM tthh.tb_pelotones ORDER BY fk_estacion_id, peloton_nombre", replacements).then(function (data) {
        data.forEach((v, k) => {
            if(!platoonsList[v.fk_estacion_id]) platoonsList[v.fk_estacion_id]=[]; 
            platoonsList[v.fk_estacion_id].push(v); 
        });
        db.setJSON(res,platoonsList,'LISTADO DE PELOTONES');
    }).catch(function (err) {return next(err);});
};

// LISTADO DE FILTROS DE CASCADA
exports.findAllFiltersWaterfall = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.tb_filtrocascada WHERE filtro_estado='ACTIVO'", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE FILTROS PARA USO DE LA CASCADA');
    }).catch(function (err) {return next(err);});
};

// Operadores
exports.findAResponsiblesByLeaderships = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_direcciones_unidades ORDER BY responsable", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE RESPONSABLES DE UNIDADES Y DIRECCIONES');
    }).catch(function (err) {return next(err);});
};