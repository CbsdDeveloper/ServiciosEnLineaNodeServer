'use strict';
const db = require('../models');
const sql = db.sequelize;


// REGLAMENTOS PARA ACCIONES DE PERSONAL
exports.findRequirementsForContractingProcedures = (req, res, next) => {
    const replacements = {
        type: sql.QueryTypes.SELECT
    };
    sql.query("SELECT * FROM resources.tb_recursos WHERE recurso_clasificacion = 'DOCUMENTOS DE JUSTIFICACIÓN Y COMPROBACIÓN PREVIO A PAGO' ORDER BY recurso_nombre", replacements).then(function (data) {
        // RETORNAR CONSULTA
        db.setJSON(res,data,'REQUERIMIENTOS PARA PROCEDIMIENTOS DE CONTRATACION');
    }).catch(function (err) {return next(err);});
};
