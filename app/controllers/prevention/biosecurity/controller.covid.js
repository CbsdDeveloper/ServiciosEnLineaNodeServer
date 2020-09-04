'use strict';
const db = require('../../../models');

const model = db.prevention.covid;
const covidResourcesMdl = db.prevention.covidResources;
const resourceModel = db.resources.resources;
const localMdl = db.permits.locals;

// ENCONTRAR REGISTRO POR ID
exports.findResourcesByBiosecurity = async (req, res) => {
	// MODELO DE RETORNO
	let resources = {};

	// INFORMACION DE LOCAL 
	let local = await localMdl.findOne({ where: { local_id: req.body.id } });

	// REGISTRO DE BIOSEGURIDAD
	let covid = await model.count({ where: { fk_local_id: req.body.id } });
	let srcList = {};

	// CONSULTAR REGISTROS
	resourceModel.findAll({
		where: { 
			recurso_clasificacion_prevencion: ['COVID19'],
			recurso_estado: 'ACTIVO'
		},
		order: [ ['recurso_id'] ]
	}).then(async resourcesList => {

		// CLASIFICACION DE RECURSOS
		resourcesList.forEach((v, k) => {
			// CREAR MODELO SI NO EXISTE
			if(!resources[v.recurso_clasificacion]) resources[v.recurso_clasificacion]={};
			// INSERTAR RECURSO EN MODELO
			resources[v.recurso_clasificacion][v.recurso_id] = v;
		});

		// CONSULTAR REGISTRO DE PROTOCOLO EXISTENTE
		if( covid > 0 ){
			// DATOS DE FORMULARIO
			covid = await model.findOne({ where: { fk_local_id: req.body.id } });
			// LISTADO DE RECURSOS DE FORMULARIO
			let tempList = await covidResourcesMdl.findAll({ where: { fk_bioseguridad_id: covid.bioseguridad_id } });
			tempList.forEach((v, k) => {
				srcList[v.fk_recurso_id] = v;
			});
		}
			
		// RETORNAR LISTADO
		res.status(200).json({
			estado: true,
			mensaje: 'RECURSOS PARA FORMULARIO DE BIOSEGURIDAD - COVID19',
			data: {
				resources: resources,
				model: {
					fk_local_id: local.local_id,
					bioseguridad_local_nombrecomercial: local.local_nombrecomercial,
					bioseguridad_local_parroquia: local.local_parroquia,
					bioseguridad_local_principal: local.local_principal,
					bioseguridad_local_secundaria: local.local_secundaria,
					bioseguridad_local_referencia: local.local_referencia,
					bioseguridad_local_aforo: local.local_aforo,
					bioseguridad_local_area: local.local_area,
					resources: srcList
				}
			}
		});
		
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });	

};

// ENCONTRAR REGISTRO POR ID
exports.insertEntity = async (req, res) => {
	// MODELO DE RETORNO
	let body = req.body;
	let covid;

	// CONSULTAR SI EL LOCAL TIENE UN FORMULARIO INGRESADO
	let i = await model.count({ where: { fk_local_id: body.fk_local_id } });

	// REGISTRAR FORMULARIO DE BIOSEGURIDAD
	if(i > 0){

		// OBTENER MODELO
		covid = await model.findOne({ where: { fk_local_id: body.fk_local_id } });
		// ACTUALIZAR MODELO
		covid.update(body);

	}else{

		// INGRESO DE ENTIDAD
		body.fk_usuario_id = 2;
		// REGISTRO DE ENTIDAD
		covid = await model.create(body);

	}

	// REGISTRAR RECURSOS DE FORMULARIO


	// RETORNAR CONSULTA
	db.setEmpty(res,'REGISTRO NUEVO ',false,covid);

};

