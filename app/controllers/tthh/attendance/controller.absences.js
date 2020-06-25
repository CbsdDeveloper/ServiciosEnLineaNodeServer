'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.tthh.absences;
const absencesControl = db.tthh.absencesControl;

const staffModel = db.tthh.staff;
const personModel = db.resources.persons;

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
				{ inasistencia_desde: seq.where(seq.fn('LOWER', seq.col('inasistencia_desde')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: staffModel, as: 'register',
							attributes: ['personal_correo_institucional'],
							include: [{
								model: personModel, as: 'person',
								attributes: ['persona_nombres','persona_apellidos']
							}]
						},
						{
							model: staffModel, as: 'staff',
							attributes: ['personal_correo_institucional'],
							include: [{
								model: personModel, as: 'person',
								attributes: ['persona_nombres','persona_apellidos','persona_doc_identidad','persona_correo','persona_telefono','persona_celular']
							}]
						},
						{
							model: absencesControl, as: 'control',
							order: [ [ 'control_registro', 'DESC' ] ],
							include: {
								model: staffModel, as: 'responsible',
								attributes: ['personal_correo_institucional'],
								include: [{
									model: personModel, as: 'person',
									attributes: ['persona_nombres','persona_apellidos']
								}]
							}
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'REGISTRO DE CONTROL DE INASISTENCIAS');
		} catch (error) {
			db.setEmpty(res,'REGISTRO DE CONTROL DE INASISTENCIAS',false,error);
		}

	}

};