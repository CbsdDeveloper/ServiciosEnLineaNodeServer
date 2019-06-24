'use strict';
const db = require('../config/db.config.js');
const sql = db.sequelize;

// PERSONAL EN FUNCIONES
exports.findAllStaff = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_personal ORDER BY personal_nombre", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PERSONAL EN FUNCIONES');
    }).catch(function (err) {return next(err);});
};

// PERSONAL EN FUNCIONES
exports.findAllStaffByLeadership = (req, res) => {
    const replacements = {
        replacements: {
            leadershipId: req.body.leadershipId
        }, 
        type: sql.QueryTypes.SELECT
    };
    sql.query("SELECT * FROM tthh.vw_relations_personal WHERE direccion_id = :leadershipId AND ppersonal_estado='EN FUNCIONES' ORDER BY personal_nombre", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PERSONAL POR DIRECCION');
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
    let platoonsList = {};
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

// DIRECTORES DE UNIDADES
exports.findAResponsiblesByLeaderships = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_direcciones_unidades ORDER BY responsable", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE RESPONSABLES DE UNIDADES Y DIRECCIONES');
    }).catch(function (err) {return next(err);});
};

// LISTADO DE CIE 10
exports.findCieByFilter = (req, res, next) => {
    const replacements = {
        replacements: {
            filter: '%' + ( (req.query.filter) ? req.query.filter : '' ) + '%'
        }, 
        type: sql.QueryTypes.SELECT
    };
    sql.query("SELECT * FROM resources.cie WHERE (LOWER(sinacentos(cie_descripcion)) LIKE LOWER(sinacentos(:filter)) OR LOWER(sinacentos(cie_codigo)) LIKE LOWER(sinacentos(:filter))) ORDER BY cie_descripcion LIMIT 30", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE CIE 10');
    }).catch(function (err) {return next(err);});
};

// REGLAMENTOS PARA ACCIONES DE PERSONAL
exports.findRegulationsByActionTypeList = (req, res, next) => {
    const replacements = {
        replacements: {
            filter: req.body.actionTypeId
        }, 
        type: sql.QueryTypes.SELECT
    };
    sql.query("SELECT * FROM resources.tb_reglamentos WHERE reglamento_id IN (SELECT fk_reglamento_id FROM tthh.tb_tipoaccion_reglamento WHERE fk_tipoaccion_id=:filter ORDER BY reglamento_clasificacion)", replacements).then(function (data) {
        // RETORNAR CONSULTA
        db.setJSON(res,data,'REGLAMENTOS PARA TIPOS DE ACCIONES');
    }).catch(function (err) {return next(err);});
};

// REGLAMENTOS PARA ACCIONES DE PERSONAL
exports.findRegulationsByActionType = (req, res, next) => {
    const replacements = {
        replacements: {
            filter: req.body.actionTypeId
        }, 
        type: sql.QueryTypes.SELECT
    };
    let model={
        regulations:{},
        selected:[]
    };
    sql.query("SELECT * FROM resources.tb_reglamentos WHERE reglamento_id IN (SELECT fk_reglamento_id FROM tthh.tb_tipoaccion_reglamento WHERE fk_tipoaccion_id=:filter)", replacements).then(function (data) {
        // ORGANIZAR TIPOS DE REGLAMENTOS
        data.forEach((v, k) => {
            if(!model.regulations[v.reglamento_clasificacion]) model.regulations[v.reglamento_clasificacion]=[]; 
            model.regulations[v.reglamento_clasificacion].push(v); 
            model.selected.push(v.reglamento_id); 
        });
        // RETORNAR CONSULTA
        db.setJSON(res,model,'REGLAMENTOS PARA TIPOS DE ACCIONES');
    }).catch(function (err) {return next(err);});
};

// REGLAMENTOS PARA ACCIONES DE PERSONAL
exports.findRegulationsByAction = (req, res, next) => {
    const replacements = {
        replacements: {
            filter: req.body.actionId
        }, 
        type: sql.QueryTypes.SELECT
    };
    let model=[];
    sql.query("SELECT fk_reglamento_id FROM tthh.tb_baselegal WHERE fk_accion_id=:filter", replacements).then(function (data) {
        // ORGANIZAR TIPOS DE REGLAMENTOS
        data.forEach((v, k) => {
            model.push(v.fk_reglamento_id); 
        });
        // RETORNAR CONSULTA
        db.setJSON(res,model,'BASE LEGAL DE ACCIONES');
    }).catch(function (err) {return next(err);});
};

