'use strict';
const db = require('../../models');
const medicineModel = db.medicines;
const inventoryModel = db.inventoryMedicines;
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
		db.setJSON(res,data,'LISTADO DE MEDICAMENTOS PARA INVENTARIO');
    }).catch(function (err) {return next(err);});
};

// ACTUALIZAR DATOS DE INVENTARIO
exports.insertInventory = (req, res, next) => {
	// REGISTRO DE FORMULARIO
	let inventoryData = req.body;
	// VALIDAR SI SE HA CARGADO EL REGISTRO
	if(inventoryData.inventario_cantidad<0 || inventoryData.inventario_cantidad>0){
		// INGRESO DE CLAVE DE MEDICAMENTO
		inventoryData.fk_medicamento_id=inventoryData.medicamento_id;
		// TRANSACCION
		inventoryData.inventario_transaccion = (inventoryData.inventario_cantidad>0)?'INGRESO':'DESCARGO';
		// VALOR ABSOLUTO DE MEDICINA
		inventoryData.inventario_cantidad=Math.abs(inventoryData.inventario_cantidad);
		// INGRESAR REGISTRO
		inventoryModel.create( inventoryData ).then(inventory => {
			db.setEmpty(res,inventoryData.inventario_transaccion + 'REGISTRADO CON EXITO!');
		});
	}else{
		// MENSAJE QUE NO SE HA REALIZADO TRANSACCION
		db.setEmpty(res,'NO SE HA INGRESADO NINGUN REGISTRO',false);
	}
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