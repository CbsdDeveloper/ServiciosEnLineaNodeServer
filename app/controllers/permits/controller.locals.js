'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const localModel = db.permits.locals;

const coordinatesMdl = db.resources.coordinates;
const ciiuMdl = db.permits.ciiu;
const taxesMdl = db.permits.taxes;
const activityMdl = db.permits.activities;
const entityMdl = db.permits.entities;
const personMdl = db.resources.persons;

const userMdl = db.admin.users;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = seq.or(
				{ local_nombrecomercial: seq.where(seq.fn('LOWER', seq.col('local_nombrecomercial')), 'LIKE', '%' + filter + '%') },
				{ local_principal: seq.where(seq.fn('LOWER', seq.col('local_principal')), 'LIKE', '%' + filter + '%') },
				{ local_secundaria: seq.where(seq.fn('LOWER', seq.col('local_secundaria')), 'LIKE', '%' + filter + '%') },
				{ local_referencia: seq.where(seq.fn('LOWER', seq.col('local_referencia')), 'LIKE', '%' + filter + '%') },
				{ entidad_razonsocial: seq.where(seq.fn('LOWER', seq.col('entidad_razonsocial')), 'LIKE', '%' + filter + '%') },
				{ entidad_ruc: seq.where(seq.fn('LOWER', seq.col('entidad_ruc')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await localModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: where,
					order: [ sort ],
					include: [
						{ 
							model: ciiuMdl, as: 'ciiu',
							attributes: [ 'ciiu_id','ciiu_codigo','ciiu_nombre' ]
						},
						{ 
							model: entityMdl, as: 'entity',
							attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
						},
						{ 
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						} 
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ENTIDADES COMERCIALES');
		} catch (error) {
			db.setEmpty(res,'ENTIDADES COMERCIALES',false,error);
		}

	},

	/*
	 * BUSCAR LOCAL POR ID
	 */
	findById(req, res){
		// CONDICIONAL
		let strWhr = { local_id: req.body.localId };
		// CONSUTAR SI EXISTE EL REGISTRO
		localModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				localModel.findOne({
					include:[
						{ 
							model: coordinatesMdl, as: 'coordinates', 
							required: false, 
							where: { coordenada_entidad: 'locales'}
						},
						{ 
							model: ciiuMdl, as: 'ciiu', 
							include:[
								{ model: taxesMdl, as: 'taxe' }
							]
						}
					],
					where: strWhr
				}).then(data => {
					// RETORNAR MODELO
					res.status(200).json({
						estado: true,
						mensaje: 'LOCALES POR ID',
						data: data
					});
				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
			}else{
				db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => local->findById');
			}
		});
	},

	/*
	 * BUSCAR LOCAL POR ID
	 */
	async detailById(req, res){
		// CONSULTA
		let data = await localModel.findOne({
			where: { local_id: req.body.localId },
			include: [
				{
					model: entityMdl, as: 'entity',
					attributes: [ 'entidad_ruc','entidad_razonsocial','entidad_contribuyente','entidad_correo','entidad_usuario_creacion' ],
					include: [
						{
							model: personMdl, as: 'person',
							attributes: [ 'persona_apellidos','persona_nombres','persona_correo','persona_doc_identidad' ]
						}
					]
				},
				{ 
					model: ciiuMdl, as: 'ciiu', 
					include:[
						{
							model: taxesMdl, as: 'taxe',
							include: [
								{
									model: activityMdl, as: 'activity'
								}
							]
						}
					]
				}
			]
		});
		// RETORNAR CONSULTA
		db.setEmpty(res,'DETALLE DE ACTIVIDAD ECONOMICA',true,data);
	},

	/*
	 * ACTIVIDADES ECONOMICAS DE UNA ENTIDAD
	 */
	async findByEntityId(req, res){
		// CONSULTA
		let data = await localModel.findAll({
			where: { fk_entidad_id: req.body.entityId },
			include: [
				{
					model: ciiuMdl, as: 'ciiu', 
					include:[
						{
							model: taxesMdl, as: 'taxe',
							include: [
								{
									model: activityMdl, as: 'activity'
								}
							]
						}
					]
				},
				{
					model: userMdl, as: 'user',
					attributes: [ [ 'usuario_login','usuario' ] ]
				}
			]
		});
		// RETORNAR CONSULTA
		db.setEmpty(res,'ACTIVIDADES ECONOMICAS DE UN RUC',true,data);
	},

	/*
	 * ACTUALIZAR REGISTROS
	 */
	updateEntity(req, res){
		// ACTUALIZAR DATOS DE LOCAL
		localModel.update(
			req.body,
			{ where: { local_id: req.body.local_id } }
		).then(data => {

			res.status(200).json({
				estado: true,
				data: req.body,
				mensaje: '¡ACTUALIZACIÓN DE DATOS COMPLETADA CON ÉXITO!'
			});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}

};
