'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { Op } = db.Sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.tthh.stations;

const unitMdl = db.administrative.units.unit;

const userMdl = db.admin.users;

module.exports = {

	// LISTADO DE ESTACIONES
	findAll(req, res){
		model.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE ESTACIONES');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// ESTACIONES POR ID
	findById(req, res){	
		model.findByPk(req.params.id).then(data => {
			db.setJSON(res,data,'ESTACION POR ID');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

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
			const where = {
				[Op.or]: [
					{ estacion_nombre: { [Op.iLike]: '%' + filter + '%'} },
					{ estacion_nombre_alterno: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
				
			const count = await model.count({ where: where });

			const rows = await model.findAll({
				offset: offset,
				limit: limit,
				where: where,
				order: [ sort ],
				attributes: {
					include: [
						[
							seq.literal('(SELECT COUNT(unidad_id) FROM logistica.tb_unidades WHERE fk_estacion_id = "tb_estaciones"."estacion_id")'), 'unidades'
						],
						[
							seq.literal('(SELECT personal_nombre FROM tthh.vw_encargado_estacion WHERE estacion_id = "tb_estaciones"."estacion_id" AND tropa_estado=\'ACTIVO\' LIMIT 1)'), 'encargadoestacion'
						],
						[
							seq.literal('(SELECT COUNT(*) FROM tthh.vw_relations_personal WHERE estacion_id = "tb_estaciones"."estacion_id" AND puesto_modalidad=\'ADMINISTRATIVO\' AND personal_estado=\'EN FUNCIONES\')'), 'administrativo'
						],
						[
							seq.literal('(SELECT COUNT(*) FROM tthh.vw_relations_personal WHERE estacion_id = "tb_estaciones"."estacion_id" AND puesto_modalidad=\'OPERATIVO\' AND personal_estado=\'EN FUNCIONES\')'), 'operativo'
						]
					]
				},
				include: [
					{
						model: userMdl, as: 'user',
						attributes: [ ['usuario_login','usuario'] ]
					}
				]
			});

			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'TTHH - LISTADO DE DIRECCIONES');

		} catch (error) { db.setEmpty(res,'TTHH - LISTADO DE DIRECCIONES',false,error); }

	}

};