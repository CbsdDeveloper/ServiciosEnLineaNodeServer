'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate, calculateLimitAndOffsetArray } = require('../../config/pagination');

const staff = db.staff;
const persons = db.persons;
const workdays = db.workdays;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = [ {model: persons, as: 'person'}, 'persona_apellidos', 'ASC' ] } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffsetArray(currentPage, pageLimit, textFilter, sortData);
			const where = seq.or(
				{ jornada_nombre: seq.where(seq.fn('LOWER', seq.col('jornada_nombre')), 'LIKE', '%' + filter + '%') },
				{ persona_doc_identidad: seq.where(seq.fn('LOWER', seq.col('persona_doc_identidad')), 'LIKE', '%' + filter + '%') },
				{ persona_apellidos: seq.where(seq.fn('LOWER', seq.col('persona_apellidos')), 'LIKE', '%' + filter + '%') },
				{ persona_nombres: seq.where(seq.fn('LOWER', seq.col('persona_nombres')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await staff.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					attributes : ['personal_id','personal_estado','personal_correo_institucional','biometrico_id','fk_jornada_id'],
					include: [
						{
							model: persons, as: 'person',
							attributes: ['persona_nombres','persona_apellidos','persona_doc_identidad','persona_correo','persona_telefono','persona_celular']
						},
						{
							model: workdays, as: 'workday',
							attributes: ['jornada_nombre','jornada_id']
						} 
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'');
		} catch (error) {
			db.setEmpty(res,'',false,error);
		}

	}

};