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
exports.findInventory = (req, res, next) => {
	const replacements = { type: sql.QueryTypes.SELECT };
	sql.query("SELECT * FROM tthh.vw_medicamentos ORDER BY medicamento_nombre", replacements).then(data => {
		data.forEach((v, k) => {
			data[k].inventario_cantidad=0;
			data[k].inventario_descripcion='AJUSTE DE INVENTARIO';
		});
		db.setJSON(res,data,'LISTADO DE MEDICAMENTOS EN STOCK');
    }).catch(function (err) {return next(err);});
};

// MEDICAMENTOS EN STOCK
exports.findStock = (req, res, next) => {
    const replacements = {
        replacements: {
            filter: '%' + ( (req.query.filter) ? req.query.filter : '' ) + '%'
        }, 
        type: sql.QueryTypes.SELECT
    };
    sql.query("SELECT * FROM tthh.vw_medicamentos_stock WHERE (LOWER(sinacentos(medicamento_nombre)) LIKE LOWER(sinacentos(:filter))) ORDER BY medicamento_nombre LIMIT 25", replacements).then(data => {
        db.setJSON(res,data,'MEDICAMENTOS EN STOCK');
    }).catch(function (err) {return next(err);});
};