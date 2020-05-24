'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const localModel = db.locals;
const coordinates = db.coordinates;
const ciiu = db.ciiu;
const taxes = db.taxes;

const userMdl = db.users;
const entityMdl = db.entities;
// VARIABLES GLOBALES
var strWhr;

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
				{ entidad_razonsocial: seq.where(seq.fn('LOWER', seq.col('entidad_razonsocial')), 'LIKE', '%' + filter + '%') },
				{ entidad_ruc: seq.where(seq.fn('LOWER', seq.col('entidad_ruc')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await localModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{ 
							model: ciiu, as: 'ciiu',
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

	// BUSCAR LOCAL POR ID
	findById(req, res){
		// CONDICIONAL
		strWhr = { local_id: req.body.localId };
		// CONSUTAR SI EXISTE EL REGISTRO
		localModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				localModel.findOne({
					include:[
						{ 
							model: coordinates, 
							as: 'coordinates', 
							required: false, 
							where: { coordenada_entidad: 'locales'}
						},
						{ 
							model: ciiu, 
							as: 'ciiu', 
							include:[
								{
									model: taxes,
									as: 'taxes'
								}
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

	// ACTUALIZAR REGISTROS
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
