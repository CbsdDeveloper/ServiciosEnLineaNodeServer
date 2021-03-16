'use strict';
const db = require('../models');
const sql = db.sequelize;


module.exports = {

    /*
     * PERSONAL EN FUNCIONES
     */
    findAllStaff(req, res){
        // VARIABLE PARA SQL
        const replacements = { type: sql.QueryTypes.SELECT };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.vw_personal ORDER BY personal_nombre", replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE PERSONAL EN FUNCIONES');
        }).catch(function (err) {return next(err);});
    },

    /*
     * PERSONAL EN FUNCIONES
     */
    findAllStaffFunctions(req, res){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {}, 
            type: sql.QueryTypes.SELECT
        };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.vw_personal_funciones WHERE estado='EN FUNCIONES' ORDER BY estado,personal_nombre",replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE PERSONAL');
        }).catch(function (err) {return next(err);});
    },

    /*
     * PERSONAL EN FUNCIONES - vw_personal_funciones
     */
    findAllPpersonalFunctions(req, res){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {}, 
            type: sql.QueryTypes.SELECT
        };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.vw_personal_funciones WHERE estado='EN FUNCIONES' AND entidad='PUESTOS' ORDER BY estado,personal_nombre",replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE PERSONAL');
        }).catch(function (err) {return next(err);});
    },

    /*
     * PERSONAL EN FUNCIONES
     */
    findAllStaffByLeadership(req, res){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {
                leadershipId: req.body.leadershipId
            }, 
            type: sql.QueryTypes.SELECT
        };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.vw_relations_personal WHERE direccion_id = :leadershipId AND ppersonal_estado='EN FUNCIONES' ORDER BY personal_nombre", replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE PERSONAL POR DIRECCION');
        }).catch(function (err) {return next(err);});
    },

    /*
     * OPERADORES
     */
    findAllDrivers(req, res, next){
        // VARIABLE PARA SQL
        const replacements = { type: sql.QueryTypes.SELECT };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.vw_conductores WHERE personal_estado='EN FUNCIONES' ORDER BY personal_nombre, licencia_categoria", replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE CONDUCTORES');
        }).catch(function (err) {return next(err);});
    },

    /*
     * LISTADO DE PELOTONES
     */
    findAllPlatoons(req, res, next){
        // VARIABLE PARA SQL
        const replacements = { type: sql.QueryTypes.SELECT };
        
        // MODELO
        let platoonsList = {};
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.tb_pelotones ORDER BY fk_estacion_id, peloton_nombre", replacements).then(function (data) {
            data.forEach((v, k) => {
                if(!platoonsList[v.fk_estacion_id]) platoonsList[v.fk_estacion_id]=[]; 
                platoonsList[v.fk_estacion_id].push(v); 
            });
            db.setJSON(res,platoonsList,'LISTADO DE PELOTONES');
        }).catch(function (err) {return next(err);});
    },

    /*
     * LISTADO DE PELOTONES - PERSONAL PARA ASIGNAR A SERVICIOS GENERALES
     */
    staffToGServices(req, res, next){
        // VARIABLE PARA SQL
        const replacements = { type: sql.QueryTypes.SELECT };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.vw_personal WHERE ppersonal_estado='EN FUNCIONES' ORDER BY personal_nombre", replacements).then(function (data) { // puesto_id IN (46,60,15,32) AND 
            db.setJSON(res,data,'LISTADO DE PERSONAL EN FUNCIONES - SERVICIOS GENERALES');
        }).catch(function (err) {return next(err);});
    },

    /*
     * LISTADO DE FILTROS DE CASCADA
     */
    findAllFiltersWaterfall(req, res, next){
        // VARIABLE PARA SQL
        const replacements = { type: sql.QueryTypes.SELECT };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.tb_filtrocascada WHERE filtro_estado='ACTIVO'", replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE FILTROS PARA USO DE LA CASCADA');
        }).catch(function (err) {return next(err);});
    },

    /*
     * DIRECTORES DE UNIDADES
     */
    findAResponsiblesByLeaderships(req, res, next){
        // VARIABLE PARA SQL
        const replacements = { type: sql.QueryTypes.SELECT };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM tthh.vw_direcciones_unidades ORDER BY responsable", replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE RESPONSABLES DE UNIDADES Y DIRECCIONES');
        }).catch(function (err) {return next(err);});
    },

    /*
     * LISTADO DE CIE 10
     */
    findCieByFilter(req, res, next){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {
                filter: '%' + ( (req.query.filter) ? req.query.filter : '' ) + '%'
            }, 
            type: sql.QueryTypes.SELECT
        };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM resources.cie WHERE (LOWER(sinacentos(cie_descripcion)) LIKE LOWER(sinacentos(:filter)) OR LOWER(sinacentos(cie_codigo)) LIKE LOWER(sinacentos(:filter))) ORDER BY cie_descripcion LIMIT 30", replacements).then(function (data) {
            db.setJSON(res,data,'LISTADO DE CIE 10');
        }).catch(function (err) {return next(err);});
    },

    /* 
     * REGLAMENTOS PARA ACCIONES DE PERSONAL
     */
    findRegulationsByActionTypeList(req, res, next){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {
                filter: req.body.actionTypeId
            }, 
            type: sql.QueryTypes.SELECT
        };
        
        // CONSULTA SQL
        sql.query("SELECT * FROM resources.tb_reglamentos WHERE reglamento_id IN (SELECT fk_reglamento_id FROM tthh.tb_tipoaccion_reglamento WHERE fk_tipoaccion_id=:filter ORDER BY reglamento_clasificacion)", replacements).then(function (data) {
            // RETORNAR CONSULTA
            db.setJSON(res,data,'REGLAMENTOS PARA TIPOS DE ACCIONES');
        }).catch(function (err) {return next(err);});
    },

    /*
     * CONFIGURACIÓN DE REGLAMENTOS PARA TIPO DE ACCION
     */
    findRegulationsByActionType(req, res, next){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {
                filter: req.body.actionTypeId
            }, 
            type: sql.QueryTypes.SELECT
        };
        
        // MODELO
        let model={
            regulations:{},
            selected:[]
        };
        
        // CONSULTA SQL
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
    },

    /*
     * BASE LEGAL - REGLAMENTOS PARA ACCION DE PERSONAL
     */
    findRegulationsByAction(req, res, next){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {
                filter: req.body.actionId
            }, 
            type: sql.QueryTypes.SELECT
        };
        
        // MODELO
        let model=[];
        
        // CONSULTA SQL
        sql.query("SELECT fk_reglamento_id FROM tthh.tb_baselegal WHERE fk_accion_id=:filter", replacements).then(function (data) {
            // ORGANIZAR TIPOS DE REGLAMENTOS
            data.forEach((v, k) => {
                model.push(v.fk_reglamento_id); 
            });
            // RETORNAR CONSULTA
            db.setJSON(res,model,'BASE LEGAL DE ACCIONES');
        }).catch(function (err) {return next(err);});
    },


    /*
    * *** UNIDAD DE SEGURIDAD Y SALUD OCUPACIONAL ***
    */

    /*
     * REGLAMENTOS PARA ACCIONES DE PERSONAL
     */
    findQuestionsDamagesForms(req, res, next){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {
                filter: req.body.actionTypeId
            }, 
            type: sql.QueryTypes.SELECT
        };

        // CONSULTA SQL
        sql.query("SELECT * FROM resources.tb_reglamentos WHERE reglamento_id IN (SELECT fk_reglamento_id FROM tthh.tb_tipoaccion_reglamento WHERE fk_tipoaccion_id=:filter ORDER BY reglamento_clasificacion)", replacements).then(function (data) {
            // RETORNAR CONSULTA
            db.setJSON(res,data,'REGLAMENTOS PARA TIPOS DE ACCIONES');
        }).catch(function (err) {return next(err);});
    },

    /*
     * REGLAMENTOS PARA ACCIONES DE PERSONAL
     */
    findQuestionDamageFormsByForm(req, res, next){
        // VARIABLE PARA SQL
        const replacements = {
            replacements: {
                filter: req.body.formId
            }, 
            type: sql.QueryTypes.SELECT
        };

        // MODELO
        let model={
            regulations:{},
            selected:[]
        };
        
        // CONSULTA SQL
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
    }

};