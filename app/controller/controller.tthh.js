const db = require('../config/db.config.js');
const sql = db.sequelize;

// Personal en funciones
exports.findAllStaff = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_personal WHERE ppersonal_estado='EN FUNCIONES' ORDER BY personal_nombre", replacements).then(function (data) {
        res.status(200).json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE PERSONAL EN FUNCIONES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Operadores
exports.findAllDrivers = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_conductores WHERE personal_estado='EN FUNCIONES' ORDER BY personal_nombre, licencia_categoria", replacements).then(function (data) {
        res.status(200).json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CONDUCTORES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Listado de pelotones
exports.findAllPlatoons = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    var platoonsList = {};
    sql.query("SELECT * FROM tthh.tb_pelotones ORDER BY fk_estacion_id, peloton_nombre", replacements).then(function (data) {

        data.forEach((v, k) => {
            if(!platoonsList[v.fk_estacion_id]) platoonsList[v.fk_estacion_id]=[]; 
            platoonsList[v.fk_estacion_id].push(v); 
        });

        res.status(200).json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CONDUCTORES',
            length: data.length,
            data: platoonsList
        });
    }).catch(function (err) {return next(err);});
};

// Operadores
exports.findAllFiltersWaterfall = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.tb_filtrocascada WHERE filtro_estado='ACTIVO'", replacements).then(function (data) {
        res.status(200).json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE FILTROS PARA USO DE LA CASCADA',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};