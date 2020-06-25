'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const markingModel = db.tthh.biometricMarkings;
const staff = db.tthh.staff;
const persons = db.resources.persons;
const period = db.tthh.biometricPeriods;

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
			const where = [
				seq.where(seq.literal("marcacion_rancho"),">",0),
				seq.or(
					{ periodo_nombre: seq.where(seq.fn('LOWER', seq.col('periodo_nombre')), 'LIKE', '%' + filter + '%') },
					{ persona_doc_identidad: seq.where(seq.fn('LOWER', seq.col('persona_doc_identidad')), 'LIKE', '%' + filter + '%') },
					{ persona_apellidos: seq.where(seq.fn('LOWER', seq.col('persona_apellidos')), 'LIKE', '%' + filter + '%') },
					{ persona_nombres: seq.where(seq.fn('LOWER', seq.col('persona_nombres')), 'LIKE', '%' + filter + '%') }
				)
			];

			const count = await markingModel.count({
				where: where,
				include:[
					{
						model: period, as: 'period',
						attributes: [ 'periodo_nombre' ]
					},
					{
						model: staff, as: 'staff',
						attributes : [ 'personal_correo_institucional' ],
						include: [ 
							{ 
								model: persons, as: 'person',
								attributes: [ 'persona_nombres','persona_apellidos','persona_doc_identidad' ]
							} 
						]
					}
				],
				group: [ 'fk_periodo_id', 'fk_personal_id' ]
			});


			const rows = await markingModel.findAll({
				where: where,
				offset: offset,
				limit: limit,
				attributes: [ [ seq.fn('SUM', seq.col('marcacion_rancho')), 'ranchototal' ] ],
				include:[
					{
						model: period, as: 'period',
						attributes: [ 'periodo_nombre' ]
					},
					{
						model: staff, as: 'staff',
						attributes : [ 'personal_correo_institucional' ],
						include: [ 
							{ 
								model: persons, as: 'person',
								attributes: [ 'persona_nombres','persona_apellidos','persona_doc_identidad' ]
							} 
						]
					}
				],
				group: [ 'fk_periodo_id', 'fk_personal_id', 'personal_id', 'personal_correo_institucional', 'persona_id', 'persona_nombres','persona_apellidos','persona_doc_identidad',
						 'periodo_id', 'periodo_nombre' ]
			});


			const meta = paginate(currentPage, count.length, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'RANCHO');
		} catch (error) {
			db.setEmpty(res,'RANCHO',false,error);
		}

	}

};