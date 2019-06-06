const db = require('../../config/db.config.js');
const medicineModel = db.medicines;
const sql = db.sequelize;

// LISTAR TODOS LOS MEDICAMENTOS
exports.findAll = (req, res) => {
	medicineModel.findAll({
		where: { medicamento_estado: 'ACTIVO' },
		order: [
			[ 'medicamento_nombre', 'ASC' ]
		]
	}).then(data => {
		db.setJSON(res,data,'LISTADO DE MEDICAMENTOS');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};

// MEDICAMENTOS EN STOCK
exports.findMedicinesInStock = (req, res, next) => {
	const replacements = {
        replacements: {
            filter: '%' + ( (req.query.filter) ? req.query.filter : '' ) + '%'
        }, 
        type: sql.QueryTypes.SELECT
    };
    sql.query("SELECT * FROM tthh.vw_medicamentos WHERE (LOWER(sinacentos(medicamento_nombre)) LIKE LOWER(sinacentos(:filter))) AND (total_medicamento > 0) ORDER BY medicamento_nombre", replacements).then(function (data) {
		
		data.forEach((v, k) => {
			data[k].inventario_cantidad=0;
			data[k].inventario_descripcion='AJUSTE DE INVENTARIO';
		});

		db.setJSON(res,data,'LISTADO DE MEDICAMENTOS EN STOCK');

    }).catch(function (err) {return next(err);});
};