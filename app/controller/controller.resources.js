const db = require('../config/db.config.js');
const sql = db.sequelize;

// Listado de paises
exports.findAllCountries = (req, res) => {
    sql.query("SELECT * FROM resources.countries", { type: sql.QueryTypes.SELECT }).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE PAISES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Listado de provincias
exports.findStates = (req, res) => {
    sql.query("SELECT * FROM resources.states WHERE fk_country_id = :countryId", { replacements: req.params, type: sql.QueryTypes.SELECT }).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE PROVINCIAS',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Listado de cantones
exports.findTowns = (req, res) => {
    sql.query("SELECT * FROM resources.towns WHERE fk_state_id = :stateId", { replacements: req.params, type: sql.QueryTypes.SELECT }).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CANTONES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Listado de parroquias
exports.findParishes = (req, res) => {
    sql.query("SELECT * FROM resources.parishes WHERE fk_town_id = :townId", { replacements: req.params, type: sql.QueryTypes.SELECT }).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE PARROQUIAS',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Códigos institucionales
exports.findAllCodes = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM resources.vw_codigosinstitucionales", replacements).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CÓDIGOS INSTITUCIONALES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Códigos institucionales por evento
exports.findCodesByType = (req, res) => {
    const type = { tracking:'codigo_flota', part:'codigo_parte' };
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM resources.vw_codigosinstitucionales WHERE " + type[req.params.option] + "='SI' ORDER BY codigo_clave", replacements).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CÓDIGOS INSTITUCIONALES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};