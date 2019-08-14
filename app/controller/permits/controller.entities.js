const db = require('../../config/db.config.js');
const entityModel = db.entities;
const partner = db.persons;
const sql = db.sequelize;

// FETCH All Customers
exports.findAll = (req, res) => {
	entityModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE ENTIDADES');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	entityModel.findOne({
		where: { entidad_id: req.body.id },
		include: [
			{ model: partner, as: 'person' }
		]
	}).then(data => {
		db.setJSON(res,data,'ENTIDAD POR ID');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};

// Find a Customer by Id
exports.findByRUC = (req, res) => {
	// CONDICIONALES DE BUSQUEDA
	var strWhr = { entidad_ruc: req.body.ruc }
	// CONSULTAR REGISTROS
	entityModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			entityModel.findOne({
				where: strWhr,
				include: [
					{ model: partner, as: 'person' }
				]
			}).then(data => {
				db.setEmpty(res,'ENTIDAD POR RUC',true,data);
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'¡No se ha encontrado ningún registro asociado a este dato!',false);
		}
	});
};

// Find a Customer by Id
exports.findByEntity = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
	var strWhr = { entidad_ruc: req.params.entityRuc}
	var filterParams = { 
		replacements: req.params, 
		type: sql.QueryTypes.SELECT
	};
	// CONSULTAR REGISTROS
	entityModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			entityModel.findOne({
				where: strWhr,
				include:[
					{ model: partner, as: 'person' }
				]
			}).then(data => {

				// CONSULTAR ACTIVIDADES ECONOMICAS
				sql.query("SELECT * FROM permisos.vw_locales WHERE UPPER(entidad_ruc) = UPPER(:entityRuc)", filterParams).then(function (locals) {

					// RETORNAR LISTADO
					res.status(200).json({
						estado: true,
						mensaje: 'ENTIDAD POR RUC',
						data: {
							locals: locals,
							entity: data
						}
					});

				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
				
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setJSON(res,[],'NO SE HA ENCONTRADO EL REGISTRO => entityModel->findByEntity');
		}
	});
};

// Find a Customer by Id
exports.summaryByRuc = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
	var filterParams = { 
		replacements: req.params, 
		type: sql.QueryTypes.SELECT
	};

	// CONSULTAR ACTIVIDADES ECONOMICAS
	sql.query("SELECT * FROM prevencion.vw_resumen_entidad WHERE UPPER(entidad_ruc) = UPPER(:entityRuc)", filterParams).then(function (summary) {

		// RETORNAR LISTADO
		res.status(200).json({
			estado: true,
			mensaje: 'RESUMEN DE ENTIDAD',
			data: summary[0]
		});

	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};