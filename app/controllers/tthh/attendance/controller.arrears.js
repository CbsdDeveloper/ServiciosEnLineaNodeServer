'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const markingModel = db.biometricMarkings;
const staff = db.staff;
const persons = db.persons;
const period = db.biometricPeriods;

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
				attributes: [ 
					[ seq.fn('SUM', seq.col('marcacion_ingreso_extras')), 'ingresoTotal' ],
					[ seq.fn('SUM', seq.col('marcacion_salida_extras')), 'salidaTotal' ],
					[ seq.fn('SUM', seq.col('marcacion_ingreso_break_extras')), 'ingresobreakTotal' ],
					[ seq.fn('SUM', seq.col('marcacion_salida_break_extras')), 'salidabreakTotal' ],
				],
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
			db.setDataTable(res,{ rows, meta },'ATRASOS');
		} catch (error) {
			db.setEmpty(res,'ATRASOS',false,error);
		}

	}

};