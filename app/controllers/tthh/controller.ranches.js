'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

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
				seq.where(seq.literal("marcacion_rancho"),">",0),
				seq.or(
					{ persona_doc_identidad: seq.where(seq.fn('LOWER', seq.col('persona_doc_identidad')), 'LIKE', '%' + filter + '%') },
					{ persona_apellidos: seq.where(seq.fn('LOWER', seq.col('persona_apellidos')), 'LIKE', '%' + filter + '%') },
					{ persona_nombres: seq.where(seq.fn('LOWER', seq.col('persona_nombres')), 'LIKE', '%' + filter + '%') }
				)
			];
			const { rows, count } = await markingModel.findAndCountAll(
				{
					include:[
						{
							model: staff, as: 'staff',
							attributes : ['personal_estado','personal_correo_institucional','biometrico_id','fk_jornada_id'],
							include: [ { 
								model: persons, as: 'person',
								attributes: ['persona_nombres','persona_apellidos','persona_doc_identidad']
							} ]
						}
					],
					where: where,
					offset: offset,
					limit: limit
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'RANCHO');
		} catch (error) {
			db.setEmpty(res,'RANCHO',false,error);
		}

	}

};